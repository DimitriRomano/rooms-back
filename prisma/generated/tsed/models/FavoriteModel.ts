import { Favorite } from "../client";
import { Integer, Required, Property, Format } from "@tsed/schema";
import { UserModel } from "./UserModel";
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

  @Property(() => UserModel)
  @Required()
  user: UserModel;

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

