import { Controller, Inject } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { AuthModel } from "@tsed/prisma";
import { Post } from "@tsed/schema";
import { AuthService } from "../../service/AuthService";

@Controller("/auths")
export class AuthCtrl {
  @Inject()
  protected authService: AuthService;

  @Post("/")
  async registerAuth(@BodyParams() auth: AuthModel): Promise<AuthModel> {
    return this.authService.registerAuth(auth);
  }
}
