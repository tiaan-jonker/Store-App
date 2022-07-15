import mongoose from 'mongoose'
const colors = require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!)

    console.log(colors.blue.bold(`MongoDB connected: ${conn.connection.host}`))
  } catch (error: any) {
    console.error(`Database error: ${error.message}`)

    process.exit(1)
  }
}

export { connectDB }
