import { Controller, Inject } from "@tsed/di";
import { Get } from "@tsed/schema";
import { UserService } from "../../services/UserService";

@Controller("/users")
export class UserCtrl {
  @Inject()
  protected userService: UserService;

  @Get("/")
  async getAll() {
    return this.userService.getAll();
  }
}
