import express from "express";
import logger from "morgan";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  debug(err.message);
  // render the error page
  res.status(err.status || 500).json({ message: "Internal Server Error" });
});

app.listen( PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})