import { Controller, Inject } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Get } from "@tsed/schema";
import { UserService } from "src/services/user/UserService";

@Controller("/users")
export class UserCtrl {
  @Inject()
  protected userService: UserService;

  @Get("/")
  async getAll() {
    return this.userService.findMany();
  }

  @Get("/:id")
  async getOne(@PathParams("id") id: number) {
    return this.userService.findFirst({
      where: {
        id
      }
    });
  }
}
