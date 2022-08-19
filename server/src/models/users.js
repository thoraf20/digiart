import mongoose from 'mongoose'
import { hashPassword } from '../../utils/hash.js';

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

schema.pre('save', function(next) {

  if ( this.password && this.isModified('password') ) {
    this.password = hashPassword(this.password);
  }

 next();
});
const UserModel = mongoose.model('Users', schema)

export default UserModel
