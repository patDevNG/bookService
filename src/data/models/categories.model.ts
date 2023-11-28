import mongoose, { Schema } from 'mongoose'
import { ICategory } from '../entities/category.entities'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseSerial = require('mongoose-serial')

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    referenceId: { type: String },
  },
  { timestamps: true }
)

categorySchema.plugin(mongooseSerial, {
  field: 'referenceId',
  prefix: 'CA',
  separator: '-',
  digits: 6,
  initCount: 'monthly',
})

interface ICategoryModel extends ICategory {}

export const CategoryModel = mongoose.model<ICategoryModel>(
  'Category',
  categorySchema
)
