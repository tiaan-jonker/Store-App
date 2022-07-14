const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  }, 
  password: {
    type: string, 
    required: true
  }
})