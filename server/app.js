import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import v1Router from './urls.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


mongoose.connect(process.env.MONGOURL)
mongoose.connection.on('error', (error) => {
  console.log('Database connection error: ', error)
})

app.use('/v1', v1Router)

app.listen( PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})