import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/swagger";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import methodOverride from "method-override";
import { config } from "./config/index";
import * as pages from "./controllers/pages/index";
import * as rest from "./controllers/rest/index";
import "./protocols";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  mount: {
    "/rest": [...Object.values(rest)],
    "/": [...Object.values(pages)]
  },
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    })
  ],
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  $beforeRoutesInit() {
    this.app
      .use(cookieParser())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(
        session({
          secret: "eH8v9qpfxVHC00brgf3E4ONtK7NhrfYYfE1i7C5PmVuwACQZvm1YpCCvT2TMw6Sck71ybe7SbVs0dmcdeLxVkkQsPzqzkiJrSwLi",
          resave: true,
          saveUninitialized: true,
          cookie: {
            path: "/",
            httpOnly: true,
            secure: false
          }
        })
      );
  }
}
