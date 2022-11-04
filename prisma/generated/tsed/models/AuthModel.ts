import { Auth } from "../client";
import { Integer, Required, Property, Format, Enum, CollectionOf, Allow } from "@tsed/schema";
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

  @CollectionOf(() => AdminModel)
  @Required()
  Admin: AdminModel[];

  @CollectionOf(() => HotelModel)
  @Required()
  Hotel: HotelModel[];

  @CollectionOf(() => UserModel)
  @Required()
  User: UserModel[];

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

