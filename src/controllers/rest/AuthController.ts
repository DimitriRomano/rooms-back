/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { Post, Req } from "@tsed/common";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authenticate, Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { AuthModel } from "@tsed/prisma";
import { Delete, Description, Get, Patch, Returns, Security } from "@tsed/schema";
import { AuthUpdate } from "../../models/auth/AuthUpdate";
import { AuthCreation } from "../../models/auth/AuthCreation";
import { Credentials } from "../../models/auth/Credentials";
import { AuthService } from "../../services/auth/AuthService";
import { AuthFind } from "../../models/auth/AuthFind";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthCtrl {
  @Inject()
  protected authService: AuthService;

  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(200, AuthModel)
  @Description("Login with username and password")
  async login(@Req() req: Req, @BodyParams() _credentials: Credentials) {
    // FACADE
    return req.user;
  }

  @Post("/signup")
  @Returns(201, AuthModel)
  @Authenticate("signup")
  @Description("Signup with username and password")
  async signup(@Req() req: Req, @BodyParams() _auth: AuthCreation) {
    // FACADE
    return req.user;
  }

  @Post("/logout")
  @Returns(204)
  @Authorize("jwt")
  @Security("jwt")
  @Description("Logout with username and password")
  async logout(@Req("auth") auth: AuthModel) {
    await this.authService.logout(auth);
    return;
  }

  @Post("/reset")
  @Returns(200, String)
  @Security("jwt")
  @Authorize("jwt")
  @Description("Update connected user password")
  async reset(@Req("auth") auth: AuthModel, @BodyParams("newPassword") newPassword: string) {
    return this.authService.resetPassword(auth, newPassword);
  }

  @Get("/me")
  @Returns(200, AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  @Description("Get connected user information")
  async authInfo(@Req("auth") auth: AuthModel) {
    return auth;
  }

  @Patch("/")
  @Returns(200, Array).Of(AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  @Description("get all users with filter")
  async getAll(@BodyParams() args?: AuthFind) {
    return this.authService.$findMany();
  }

  @Get("/:id")
  @Returns(200, AuthModel)
  @Description("get one user with id")
  async getOne(@BodyParams("id") id: number) {
    return this.authService.$findUnique(id);
  }

  @Patch("/:id")
  @Returns(200, AuthModel)
  @Security("jwt")
  @Authorize("jwt")
  @Description("update one user with id")
  async update(@PathParams("id") id: number, @BodyParams() auth: AuthUpdate) {
    return this.authService.$update(id, auth);
  }

  @Delete("/:id")
  @Returns(200, String)
  @Security("jwt")
  @Authorize("jwt")
  @Description("delete one user with id")
  async delete(@BodyParams("id") id: number) {
    return this.authService.$delete(id);
  }
}
