import { Room } from "../client";
import { Integer, Required, Property, CollectionOf } from "@tsed/schema";
import { HotelModel } from "./HotelModel";
import { BookingModel } from "./BookingModel";
import { FeatureRoomModel } from "./FeatureRoomModel";
import { ImageModel } from "./ImageModel";

export class RoomModel implements Room {
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

  @Property(Number)
  @Required()
  price: number;

  @Property(() => HotelModel)
  @Required()
  hotel: HotelModel;

  @Property(Number)
  @Integer()
  @Required()
  hotelId: number;

  @CollectionOf(() => BookingModel)
  @Required()
  bookings: BookingModel[];

  @Property(Boolean)
  @Required()
  isAvailable: boolean;

  @CollectionOf(() => FeatureRoomModel)
  @Required()
  FeatureRoom: FeatureRoomModel[];

  @CollectionOf(() => ImageModel)
  @Required()
  images: ImageModel[];

  @Property(Number)
  @Integer()
  @Required()
  nbBed: number;
}

