/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post, Req } from "@tsed/common";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { BodyParams } from "@tsed/platform-params";
import { AuthModel } from "@tsed/prisma";
import { Returns } from "@tsed/schema";
import { AuthCreation } from "../../models/AuthCreation";
import { Credentials } from "../../models/Credentials";
import { AuthService } from "../../services/auth/AuthService";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthCtrl {
  @Inject()
  protected authService: AuthService;

  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(200, AuthModel)
  login(@Req() req: Req, @BodyParams() _credentials: Credentials) {
    // FACADE
    return req.user;
  }

  @Post("/signup")
  @Returns(201, String)
  @Authenticate("signup")
  signup(@Req() req: Req, @BodyParams() _auth: AuthCreation) {
    // FACADE
    return req.user;
  }
}
