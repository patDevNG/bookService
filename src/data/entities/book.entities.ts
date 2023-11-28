/**
 * Book entity tha represents a book in the library.
 */

export interface IBook {
  _id?: string
  title: string
  authorId: string
  isbn: string
  totalCopies: number
  availableCopies: number
  imageUrl: string
  bookType: string
  categoryId: string
  publicationDate: Date
  language: string
  description: string
  pageCount: number
  edition: string
  tags: string[]
  acquiredDate: Date
  referenceId?: string
  price: number
}
