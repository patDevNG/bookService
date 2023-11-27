import mongoose, { Schema } from "mongoose";
import { IBorrowingHistory } from "../entities/borrowingHistory.entites";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseSerial = require("mongoose-serial");

const borrowingHistorySchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    bookId: { type: mongoose.Types.ObjectId, required: true, ref: "Book" },
    checkOutDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    checkInDate: { type: Date },
    finesIncurred: { type: Number },
    referenceId: { type: String },
    status: { type: String, default: "CHECKED_OUT", enum: ["CHECKED_OUT", "CHECKED_IN"] },
  },
  { timestamps: true }
);

borrowingHistorySchema.plugin(mongooseSerial, {
  field: "referenceId",
  prefix: "BH",
  separator: "-",
  digits: 6,
  initCount: "monthly",
});

interface IBorrowingHistoryModel extends IBorrowingHistory {}

export const BorrowingHistoryModel = mongoose.model<IBorrowingHistoryModel>(
  "BorrowingHistory",
  borrowingHistorySchema
);