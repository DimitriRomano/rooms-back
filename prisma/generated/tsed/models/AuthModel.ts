import { Auth } from "../client";
import { Integer, Required, Property, Format, Enum, Allow } from "@tsed/schema";
import { Role } from "../enums";
import { AdminInformationModel } from "./AdminInformationModel";
import { UserInformationModel } from "./UserInformationModel";
import { HotelAdminInformationModel } from "./HotelAdminInformationModel";

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

  @Property(() => AdminInformationModel)
  @Allow(null)
  AdminInformation: AdminInformationModel | null;

  @Property(() => UserInformationModel)
  @Allow(null)
  UserInformation: UserInformationModel | null;

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

  @Property(() => HotelAdminInformationModel)
  @Allow(null)
  HotelAdminInformation: HotelAdminInformationModel | null;
}

