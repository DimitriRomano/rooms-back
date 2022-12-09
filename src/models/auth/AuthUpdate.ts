import { Role } from "@prisma/client";
import { Description } from "@tsed/schema";

export class AuthUpdate {
  @Description("The role of the user.")
  role?: Role;

  @Description("The firstName of the user.")
  firstName?: string;

  @Description("The lastName of the user.")
  lastName?: string;

  @Description("The email of the user.")
  image?: string;

  constructor(obj: Partial<AuthUpdate> = {}) {
    Object.assign(this, obj);
  }
}
