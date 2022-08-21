import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    price: {
      type: Number, required: true
    },
    is_on_sale: {
      type: Boolean, default: true, requird: true
    },
    address: {
      type: String, required: true
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users' 
    },
    UPID: {
      type: Number,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: false
    },
    coin_id: {
      type: String,
      required: true
    },
  },
  { collection: 'artworks', timestamps: true },
)

const ArtworkModel = mongoose.model('Artwork', schema)

export default ArtworkModel;
