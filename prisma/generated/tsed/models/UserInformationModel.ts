import { UserInformation } from "../client";
import { Integer, Required, Property, CollectionOf, Allow } from "@tsed/schema";
import { BookingModel } from "./BookingModel";
import { AuthModel } from "./AuthModel";
import { FavoriteModel } from "./FavoriteModel";

export class UserInformationModel implements UserInformation {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @CollectionOf(() => BookingModel)
  @Required()
  bookings: BookingModel[];

  @Property(() => AuthModel)
  @Required()
  auth: AuthModel;

  @Property(Number)
  @Integer()
  @Required()
  authId: number;

  @CollectionOf(() => FavoriteModel)
  @Required()
  Favorite: FavoriteModel[];

  @Property(String)
  @Allow(null)
  image: string | null;

  @Property(String)
  @Required()
  firstName: string;

  @Property(String)
  @Required()
  lastName: string;
}

