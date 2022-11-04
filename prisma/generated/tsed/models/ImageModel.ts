import { Image } from "../client";
import { Integer, Required, Property, Format, Allow } from "@tsed/schema";
import { RoomModel } from "./RoomModel";
import { HotelModel } from "./HotelModel";

export class ImageModel implements Image {
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
  url: string;

  @Property(() => RoomModel)
  @Allow(null)
  Room: RoomModel | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  roomId: number | null;

  @Property(() => HotelModel)
  @Allow(null)
  Hotel: HotelModel | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  hotelId: number | null;
}

