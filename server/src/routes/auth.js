import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import createHttpError from "http-errors";
import { randomBytes } from 'crypto';

import UserModel from "../models/users.js";
import { generateJwt } from "../../utils/jwt.js";
import { generateWallet } from "../../utils/wallet.js";

export const signupHandler = async (req, res) => {
  const requestSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    user_type: Joi.string().required()
  })

  const { value, error } = requestSchema.validate(req.body)

  if (error) {
    return res.status(createHttpError(400)).json({ error: error.message })
  }

  const existingUser = await UserModel.findOne({
    email: value.email,
  })

  if (existingUser) {
    return res.status(createHttpError(409)).json({ message: "User Account Already Exist" })
  }

  try {

    const generated_id = randomBytes(32).toString('hex');
    const address = generateWallet(generated_id)

    const newUser = await UserModel.create({
      email: value.email,
      password: value.password,
      user_type: value.user_type,
      ethereum_address: address,
      generated_id
    })

    const result = generateJwt(newUser);

    return res.status(200).json({
      message: "Signup success!!",
      user: result
    });
  } catch (error) {
    return res.status(500).json({
      message: "Account registration failed. Try again!",
      user: {}
    });
  }
}

export const loginHandler = async (req, res) => {
  const requestSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { value, error } = requestSchema.validate(req.body)

  if (error) {
    return res.status(createHttpError(400)).json({ error: error.message })
  }

  const existingUser = await UserModel.findOne({
    email: value.email,
  })

  if (!existingUser) {
    return res.status(createHttpError(409)).json({ 
      message: "User not registered! Please signup.",
      user: {}
    })
  }

  try {
    const result = await bcrypt.compare(password, existingUser.password);

    if (!result) {
      return res.status(401).json({
        message: "Invalid Credentials",
        user: {}
      });
    }

    const returnVal = generateJwt(existingUser);

    return res.status(200).json({
      message: "Login Success!",
      user: returnVal
    });
  } catch (error) {
    return res.status(401).json({
      message: "Login failed! Try again!",
      user: {}
    });
  }
}

export const escrowLookUpHandler = async (req, res) => {
  const { escrowEmail } = req.body;

  try {
    const user = await UserModel.findOne({
      email: escrowEmail, user_type: "escrow" 
    });

    if (!user) {
      return res.status(400).json({ 
        message: "User is not Escrow Account Holder!.",
        user: {}
      })
    }

    return res.status(200).json({
      message: "Lookup success",
      user
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}