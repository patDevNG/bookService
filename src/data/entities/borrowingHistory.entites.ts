/**
 * This class represents a borrowing history entity
 */
export interface IBorrowingHistory {
  _id?: string
  userId: string
  bookId: string
  checkOutDate: Date
  dueDate: Date
  checkInDate: Date
  referencdeId: string
  finesIncurred: number
  status: string
}
