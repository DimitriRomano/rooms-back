import { Hotel } from "../client";
import { Integer, Required, Property, CollectionOf } from "@tsed/schema";
import { RoomModel } from "./RoomModel";
import { AuthModel } from "./AuthModel";
import { FavoriteModel } from "./FavoriteModel";
import { FeatureHotelModel } from "./FeatureHotelModel";
import { ImageModel } from "./ImageModel";

export class HotelModel implements Hotel {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @Property(String)
  @Required()
  name: string;

  @Property(String)
  @Required()
  description: string;

  @Property(String)
  @Required()
  address: string;

  @Property(String)
  @Required()
  city: string;

  @Property(String)
  @Required()
  state: string;

  @Property(String)
  @Required()
  country: string;

  @Property(String)
  @Required()
  zip: string;

  @Property(String)
  @Required()
  phone: string;

  @Property(String)
  @Required()
  email: string;

  @Property(String)
  @Required()
  website: string;

  @CollectionOf(() => RoomModel)
  @Required()
  rooms: RoomModel[];

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

  @CollectionOf(() => FeatureHotelModel)
  @Required()
  FeatureHotel: FeatureHotelModel[];

  @Property(Number)
  @Required()
  longitude: number;

  @Property(Number)
  @Required()
  latitude: number;

  @CollectionOf(() => ImageModel)
  @Required()
  images: ImageModel[];
}

