import { Favorite } from "../client";
import { Integer, Required, Property, Format } from "@tsed/schema";
import { UserInformationModel } from "./UserInformationModel";
import { HotelModel } from "./HotelModel";

export class FavoriteModel implements Favorite {
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

  @Property(() => UserInformationModel)
  @Required()
  user: UserInformationModel;

  @Property(Number)
  @Integer()
  @Required()
  userId: number;

  @Property(() => HotelModel)
  @Required()
  hotel: HotelModel;

  @Property(Number)
  @Integer()
  @Required()
  hotelId: number;
}

