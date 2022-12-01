/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { Post, Req } from "@tsed/common";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authenticate, Authorize } from "@tsed/passport";
import { BodyParams } from "@tsed/platform-params";
import { AuthModel } from "@tsed/prisma";
import { Delete, Get, Patch, Returns, Security } from "@tsed/schema";
import { AuthUpdate } from "../../models/auth/AuthUpdate";
import { AuthCreation } from "../../models/auth/AuthCreation";
import { Credentials } from "../../models/auth/Credentials";
import { AuthService } from "../../services/auth/AuthService";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthCtrl {
  @Inject()
  protected authService: AuthService;

  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(200, AuthModel)
  async login(@Req() req: Req, @BodyParams() _credentials: Credentials) {
    // FACADE
    return req.user;
  }

  @Post("/signup")
  @Returns(201, String)
  @Authenticate("signup")
  async signup(@Req() req: Req, @BodyParams() _auth: AuthCreation) {
    // FACADE
    return req.user;
  }

  @Post("/logout")
  @Returns(200, String)
  @Authorize("jwt")
  @Security("jwt")
  async logout(@Req("auth") auth: AuthModel) {
    return this.authService.logout(auth);
  }

  @Post("/reset")
  @Returns(200, String)
  @Security("jwt")
  @Authorize("jwt")
  async reset(@Req("auth") auth: AuthModel, @BodyParams("newPassword") newPassword: string) {
    return this.authService.resetPassword(auth, newPassword);
  }

  @Get("/me")
  @Returns(200, AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  async authInfo(@Req("auth") auth: AuthModel) {
    return auth;
  }

  @Get("/")
  @Returns(200, Array).Of(AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  async getAll(@BodyParams() args?: Prisma.AuthFindManyArgs) {
    return this.authService.$findMany();
  }

  @Get("/:id")
  @Returns(200, AuthModel)
  async getOne(@BodyParams("id") id: number) {
    return this.authService.$findUnique(id);
  }

  @Patch("/:id")
  @Returns(200, AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  async update(@BodyParams("id") id: number, @BodyParams() auth: AuthUpdate) {
    return this.authService.$update(id, auth);
  }

  @Delete("/:id")
  @Returns(200, String)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@BodyParams("id") id: number) {
    return this.authService.$delete(id);
  }

  @Patch("/me")
  @Returns(200, AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  async updateMe(@Req("auth") auth: AuthModel, @BodyParams() authUpdate: AuthUpdate) {
    return this.authService.$update(auth.id, authUpdate);
  }
}
