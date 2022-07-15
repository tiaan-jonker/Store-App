import mongoose from 'mongoose'
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

const Profile = mongoose.model('Profile', ProfileSchema)

export { Profile }
