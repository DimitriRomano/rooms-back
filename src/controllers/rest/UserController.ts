import { Post } from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { AuthModel } from "@tsed/prisma";
import { UserService } from "../../service/UserService";

@Controller("/users")
export class UserCtrl {
  @Inject()
  protected userService: UserService;

  @Post("/")
  async registerUser(@BodyParams() user: { email: string; password: string,username: string }): Promise<AuthModel> {
    return this.userService.registerUser(user);
  }
}
