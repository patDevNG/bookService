import { injectable } from "inversify";
import { BookRepository } from '../data/repositories/book.repository';
import { IBook } from "../data/entities/book.entities";

export interface IBookService {
  create(book: IBook): Promise<IBook>;
  getBookByReferenceId(referenceId: string): Promise<IBook | null>;
  searchBook(authorOrTitle: string): Promise<IBook | null>;
  checkOutBook(id: string, userId: string, checkInDate: Date): Promise<IBook | null>;
  checkInBook(id: string, userId: string): Promise<IBook | null>;
}

@injectable()
export class BookService implements IBookService {
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  /**
   *
   * @param book
   * @returns book
   */
  public async create(book: IBook): Promise<IBook> {
    return await this.bookRepository.create(book);
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async getBookByReferenceId(referenceId: string): Promise<IBook | null> {
    return await this.bookRepository.findByReferenceId(referenceId);
  }

  /**
   *
   * @param authorOrTitle
   * @returns
   */
  public async searchBook(authorOrTitle: string): Promise<IBook | null> {
    return await this.bookRepository.searchBook(authorOrTitle);
  }

  /**
   * checkOutBook
   * @param id
   * @param userId
   * @param checkInDate
   */
  public async checkOutBook(id: string, userId: string, checkInDate: Date): Promise<IBook | null> {
    return await this.bookRepository.checkOutBook(id, userId, checkInDate);
  }

  /**
   * checkInBook
   * @param id
   * @param userId
   */
  public async checkInBook(id: string, userId: string): Promise<IBook | null> {
    return await this.bookRepository.checkInBook(id, userId);
  }
}