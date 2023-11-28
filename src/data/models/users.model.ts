/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, { Schema } from 'mongoose'
import { IUser } from '../entities/user.entities'
const mongooseSerial = require('mongoose-serial')

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    referenceId: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    personalNumber: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.plugin(mongooseSerial, {
  field: 'referenceId',
  prefix: 'LIB',
  separator: '-',
  digits: 6,
  initCount: 'monthly',
})

interface IUserModel extends IUser {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserModel = mongoose.model<IUserModel>('User', userSchema)
