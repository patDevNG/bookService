import mongoose, { Schema } from 'mongoose'
import { IBook } from '../entities/book.entities'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseSerial = require('mongoose-serial')

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, required: true, ref: 'Author' },
    isbn: { type: String, required: true, unique: true },
    totalCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
    imageUrl: { type: String },
    bookType: { type: String },
    categoryId: { type: mongoose.Types.ObjectId, ref: 'Category' },
    publicationDate: { type: Date },
    language: { type: String },
    description: { type: String },
    pageCount: { type: Number },
    edition: { type: String },
    tags: { type: [String] },
    acquiredDate: { type: Date },
    referenceId: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
)

bookSchema.plugin(mongooseSerial, { field:"referenceId", prefix:"BK", initCount:"monthly" , separator: "-", digits:5});

interface IBookModel extends IBook {}

export const BookModel = mongoose.model<IBookModel>('Book', bookSchema)
