import { Auth } from "../client";
import { Integer, Required, Property, Format, Enum, Allow } from "@tsed/schema";
import { Role } from "../enums";
import { AdminModel } from "./AdminModel";
import { HotelModel } from "./HotelModel";
import { UserModel } from "./UserModel";

export class AuthModel implements Auth {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @Property(Date)
  @Format("date-time")
  @Required()
  createdAt: Date;

  @Property(Date)
  @Format("date-time")
  @Required()
  updatedAt: Date;

  @Property(String)
  @Required()
  email: string;

  @Property(String)
  @Required()
  password: string;

  @Required()
  @Enum(Role)
  role: Role;

  @Property(() => AdminModel)
  @Allow(null)
  Admin: AdminModel | null;

  @Property(() => HotelModel)
  @Allow(null)
  Hotel: HotelModel | null;

  @Property(() => UserModel)
  @Allow(null)
  User: UserModel | null;

  @Property(Boolean)
  @Required()
  disabled: boolean;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  emailVerifiedAt: Date | null;

  @Property(String)
  @Allow(null)
  token: string | null;
}

