import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET || "pogimozai",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

export default app;
