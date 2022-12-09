import { Role } from "@tsed/prisma";
import { Description, Example, Required } from "@tsed/schema";
import { Credentials } from "./Credentials";

export class AuthCreation extends Credentials {
  @Description("User role")
  @Required()
  @Example(Role.USER)
  role: Role;

  @Description("User first name")
  @Required()
  @Example("John")
  firstName: string;

  @Description("User last name")
  @Required()
  @Example("Doe")
  lastName: string;

  constructor(obj: Partial<AuthCreation> = {}) {
    super();
    if (!this.role) {
      this.role = Role.USER;
    }
    Object.assign(this, obj);
  }
}
