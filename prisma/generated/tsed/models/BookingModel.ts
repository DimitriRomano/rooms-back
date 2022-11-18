import { Booking } from "../client";
import { Integer, Required, Property, Format, Allow, Enum } from "@tsed/schema";
import { RoomModel } from "./RoomModel";
import { UserInformationModel } from "./UserInformationModel";
import { Status } from "../enums";

export class BookingModel implements Booking {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @Property(Date)
  @Format("date-time")
  @Required()
  checkIn: Date;

  @Property(Date)
  @Format("date-time")
  @Required()
  checkOut: Date;

  @Property(() => RoomModel)
  @Allow(null)
  room: RoomModel | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  roomId: number | null;

  @Property(() => UserInformationModel)
  @Allow(null)
  user: UserInformationModel | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  userId: number | null;

  @Property(Date)
  @Format("date-time")
  @Required()
  createdAt: Date;

  @Property(Date)
  @Format("date-time")
  @Required()
  updatedAt: Date;

  @Property(Number)
  @Integer()
  @Required()
  nbPerson: number;

  @Required()
  @Enum(Status)
  status: Status;
}

