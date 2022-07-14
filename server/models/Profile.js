const mongoose = require('mongoose')
const { Schema } = mongoose

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdEvents: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
})

module.exports = mongoose.model('Profile', ProfileSchema)
