import { injectable } from "inversify";
import { BookModel } from "../models/books.model";
import { BorrowingHistoryModel } from "../models/borrowingHistory.model"
import { IBook } from "../entities/book.entities";
import mongoose from "mongoose";
import { StaticUserRepository } from "./static.repository";

interface IBookRepository {
  create(book: IBook): Promise<IBook>;
  findByReferenceId(referenceId: string): Promise<IBook | null>;
  searchBook(authorOrTitle: string): Promise<IBook | null>;
  updateBook(id: string, book: IBook): Promise<IBook | null>;
  checkOutBook(id: string, userId: string, checkInDate: Date): Promise<IBook | null>;
  checkInBook(id: string, userId: string): Promise<IBook | null>;
}

@injectable()
export class BookRepository implements IBookRepository {
  private bookModel = BookModel;

  private borrowingHistoryModel = BorrowingHistoryModel;

  /**
   *
   * @param book
   * @returns book
   */
  public async create(book: IBook): Promise<IBook> {
    return await this.bookModel.create(book);
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async findByReferenceId(referenceId: string): Promise<IBook | null> {
    return await this.bookModel.findOne({ referenceId }).lean();
  }

  /**
   *
   * @param authorOrTitle
   * @returns
   */
  public async searchBook(authorOrTitle: string): Promise<IBook | null> {
    return await this.bookModel
      .findOne({ $or: [{ authorId: authorOrTitle }, { title: authorOrTitle }] })
      .lean();
  }

  /**
   * updateBook
   * @param id
   * @param book
   */
  public async updateBook(id: string, book: IBook): Promise<IBook | null> {
    const modifiableFields = [
      "availableCopies",
      "totalCopies",
      "imageUrl",
      "checkOutDate",
      "checkInDate",
    ];

    const foundBook = await this.bookModel.findById(id);

    if (!foundBook) {
      throw new Error("Book not found");
    }

    this.updateModifiedProperties(foundBook, book, modifiableFields);
    await foundBook.save();

    return foundBook;
  }

  /**
   *
   * @param oldObject
   * @param modifiedObject
   * @param properties
   */
  private updateModifiedProperties(
    oldObject: any,
    modifiedObject: any,
    properties: string[]
  ) {
    for (const property of properties) {
      if (modifiedObject[property] !== undefined) {
        oldObject[property] = modifiedObject[property];
      }
    }
  }

  /**
   * checkOutBook
   * @param id
   * @param book
   * @param userId - personalNumber
   * @param personalNumber
   * @param checkInDate
   */
  public async checkOutBook(
    id: string,
    personalNumber: string,
    checkInDate: Date
  ): Promise<IBook | null> {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const foundBook = await this.bookModel.findOne({
        referenceId: id,
      }).session(session);


      if (!foundBook) {
        throw new Error("Book not found");
      }

      if (foundBook.availableCopies === 0) {
        throw new Error("Book not available");
      }
      foundBook.availableCopies -= 1;
      const user = await StaticUserRepository.findByPersonal(personalNumber);

      const exitingBorrowingHistory = await this.borrowingHistoryModel.findOne({
        userId: user?._id,
        bookId: foundBook._id,
        status: "CHECKED_OUT",
      }).sort({ updatedAt: -1 }).session(session);

      if(exitingBorrowingHistory) {
        throw new Error("Book already checked out by this user");
      }

       await this.borrowingHistoryModel.create({
        userId: user?._id,
        bookId: foundBook._id,
        checkOutDate: new Date(),
        checkInDate: checkInDate,
      }, {
        session
      });

      await foundBook.save({ session });
      await session.commitTransaction();

      return foundBook;

    } catch (error) {
      session.abortTransaction();
      throw new Error(error as string);
    }
  }

  /**
   * checkInBook
   * @param id
   * @param book
   * @param userId
   */
  public  async checkInBook(id: string, userId: string ): Promise<IBook | null> {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const foundBook = await this.bookModel.findOne({referenceId: id}).session(session);


      if(!foundBook) {
        throw new Error("Book not found");
      }

      const user = await StaticUserRepository.findByPersonal(userId);

      if(!user) {
        throw new Error("User not found");
      }

      foundBook.availableCopies += 1;
      await this.borrowingHistoryModel.findOneAndUpdate({
        userId: user?._id,
        bookId: foundBook._id,
        status: "CHECKED_OUT",
      }, {
        checkInDate: new Date(),
        status: "CHECKED_IN",
      }, {
        session
      });

      await foundBook.save({ session });
      await session.commitTransaction();

      return foundBook;

    } catch (error) {
      await session.abortTransaction();
      throw new Error(error as string);
    }
  }
}
