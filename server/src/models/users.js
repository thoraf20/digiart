import mongoose from 'mongoose'

export const userType = {
  ESCROW : 'escrow',
  BUYER : 'buyer',
  ARTIST : 'artist',
}

const schema = new mongoose.Schema(
  {
   email: { type: String },
   password: { type: String },
   ethereum_address: { type: String },
   user_type: { type: String, enum: userType },
   generated_id: { type: String },
  },
  { collection: 'users', timestamps: true }
)

const UserModel = mongoose.model('Users', schema)

export default UserModel
