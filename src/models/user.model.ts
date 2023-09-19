import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'regular'
    }
  },
  {
    timestamps: true
  }
)

const UserModel = mongoose.model('users', userSchema)

export default UserModel
