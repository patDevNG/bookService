import { injectable } from 'inversify'
import { BookRepository } from '../data/repositories/book.repository'
import { IBook } from '../data/entities/book.entities'

export interface IBookService {
  create(book: IBook): Promise<IBook>
  getBookByReferenceId(referenceId: string): Promise<IBook | null>
  searchBook(title: string | null, author: string | null): Promise<IBook[]>
  checkOutBook(
    id: string,
    userId: string,
    checkInDate: Date
  ): Promise<IBook | null>
  checkInBook(id: string, userId: string): Promise<IBook | null>
  getBooks(): Promise<IBook[]>
}

@injectable()
export class BookService implements IBookService {
  private bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  /**
   *
   * @param book
   * @returns book
   */
  public async create(book: IBook): Promise<IBook> {
    return await this.bookRepository.create(book)
  }

  /**
   *
   * @param referenceId
   * @returns
   */
  public async getBookByReferenceId(
    referenceId: string
  ): Promise<IBook | null> {
    return await this.bookRepository.findByReferenceId(referenceId)
  }

  /**
   *
   * @param authorOrTitle
   * @returns
   */
  public async searchBook(titleOrAuthor: string | null): Promise<IBook[]> {
    return await this.bookRepository.searchBook(titleOrAuthor)
  }

  /**
   * checkOutBook
   * @param id
   * @param userId
   * @param checkInDate
   */
  public async checkOutBook(
    id: string,
    userId: string,
    checkInDate: Date
  ): Promise<IBook | null> {
    return await this.bookRepository.checkOutBook(id, userId, checkInDate)
  }

  /**
   * checkInBook
   * @param id
   * @param userId
   */
  public async checkInBook(id: string, userId: string): Promise<IBook | null> {
    return await this.bookRepository.checkInBook(id, userId)
  }

  /**
   * getBooks
   * @returns
   */
  public async getBooks(): Promise<IBook[]> {
    return await this.bookRepository.getBooks()
  }
}
