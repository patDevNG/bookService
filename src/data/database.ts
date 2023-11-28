import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

/**
 * Connect to the database
 */
export const connect = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI

    await mongoose.connect(MONGO_URI as string)
    console.log('Database connected')
  } catch (error) {
    console.log('Database connection failed')
    await mongoose.disconnect()
    process.exit(1)
  }
}
