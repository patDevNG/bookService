import mongoose, { Schema } from 'mongoose'
import { IAuthor } from '../entities/author.entities'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseSerial = require('mongoose-serial')

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    biography: { type: String },
    referenceId: { type: String },
  },
  { timestamps: true }
)

authorSchema.plugin(mongooseSerial, {
  field: 'referenceId',
  prefix: 'AU',
  initCount: 'monthly',
  separator: '-',
  digits: 5,
})

interface IAuthorModel extends IAuthor {}

export const AuthorModel = mongoose.model<IAuthorModel>('Author', authorSchema)
