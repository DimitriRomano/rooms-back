import { Role, HotelModel } from "@tsed/prisma";
import { Description, Example, Required } from "@tsed/schema";
import { Credentials } from "./Credentials";

export class AuthCreation extends Credentials {
  @Description("User role")
  @Required()
  @Example(Role.USER)
  role: Role;

  @Description("User Hotel")
  hotels: HotelModel[] = [];

  constructor(obj: Partial<AuthCreation> = {}) {
    super();
    Object.assign(this, obj);
    if (!this.role) {
      this.role = Role.USER;
    }
    if (this.hotels.length !== 0 && this.role !== Role.HOTEL) {
      throw new Error("Only Hotel Managers can have hotels");
    }
  }
}
