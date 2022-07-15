import mongoose from 'mongoose'
const { Schema } = mongoose
import { PasswordManager } from '../utils/PasswordHash'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', UserSchema)

export { User }
