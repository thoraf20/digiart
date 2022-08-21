import express from 'express';
import ArtworkModel from '../models/artwork.js';


export const getArtworks = async (req, res) => {

  try {
    const allListings = await ArtworkModel.find({
      is_on_sale: true,
      owner_id: !res.locals.user._id
    })

    return res.status(200).json({
      message: "Artworks successfully loaded",
      allListings
    });
  } catch (error) {
    return res.status(500).json({
      message: "Cannot retrieve data!! Try again!",
      allListings: []
    });
  }
}

export const getMyArtworks = async (req, res) => {

  try {
    const myListings = await ArtworkModel.find({
      owner_id: res.locals.user._id
    })

    return res.status(200).json({
      message: "Your artworks successfully loaded",
      myListings
    })
  } catch (error) {
    return res.status(500).json({
      message: "Cannot retrieve data!! Try again!",
      myListings: []
    })
  }
}

export const addArtwork = async (req, res) => {
  const requestSchema = Joi.object({
  price: Joi.number().required(),
  address: Joi.string().required(),
  UPID: Joi.number().required(),
  coin_id: Joi.string().required()
  })

  const { value, error } = requestSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  try {
    const isPresent = await ArtworkModel.findOne({
      UPID: value.UPID
    })

    if (isPresent) {
      return res.status(401).json({
        message: "Artwork already exists!!",
        listing: {}
      })
    }

    const newListing = await ArtworkModel.create({
      price: value.price,
      address: value.address,
      UPID: value.UPID,
      is_on_sale: true,
      owner_id: res.locals.user._id,
      coin_id: value.coin_id
    });

    return res.status(200).json({
      message: "Your listing has been successfully created",
      newListing
    });
  } catch (error) {
    return res.status(500).json({
      message: "Cannot create data!! Try again!",
      newListing: []
    })
  }
}