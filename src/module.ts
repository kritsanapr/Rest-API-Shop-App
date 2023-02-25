import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import { Application } from "express";
import { json, urlencoded } from "express";
import cookieSession from "cookie-session";
import mongoose from "mongoose";

export class AppModule {
  constructor(public app: Application) {
    app.set("trust-proxy", true);

    app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );

    app.use(urlencoded({ extended: true }));
    app.use(urlencoded());
    app.use(json());
    app.use(
      cookieSession({
        signed: false,
        secure: false,
      })
    );
  }

  async start() {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }

    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }

    try {
      mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
      console.error(err);
    }

    this.app.listen(3000, () => {
      console.log("Listening on port 3000!");
    });
  }
}
