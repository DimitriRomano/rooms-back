/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post, Req } from "@tsed/common";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authenticate, Authorize } from "@tsed/passport";
import { BodyParams } from "@tsed/platform-params";
import { AuthModel } from "@tsed/prisma";
import { Returns, Security } from "@tsed/schema";
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

  @Post("/authInfo")
  @Returns(200, AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  authInfo(@Req("auth") auth: AuthModel) {
    return auth;
  }

  @Post("/logout")
  @Returns(200, String)
  @Authorize("jwt")
  @Security("jwt")
  logout(@Req("auth") auth: AuthModel) {
    return this.authService.logout(auth);
  }

  @Post("/reset")
  @Returns(200, String)
  @Security("jwt")
  @Authorize("jwt")
  reset(@Req("auth") auth: AuthModel, @BodyParams("newPassword") newPassword: string) {
    return this.authService.resetPassword(auth, newPassword);
  }
}
