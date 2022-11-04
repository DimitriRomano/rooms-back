import { FeatureHotel } from "../client";
import { Integer, Required, Property, Format } from "@tsed/schema";
import { FeatureModel } from "./FeatureModel";
import { HotelModel } from "./HotelModel";

export class FeatureHotelModel implements FeatureHotel {
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

  @Property(() => FeatureModel)
  @Required()
  feature: FeatureModel;

  @Property(Number)
  @Integer()
  @Required()
  featureId: number;

  @Property(() => HotelModel)
  @Required()
  hotel: HotelModel;

  @Property(Number)
  @Integer()
  @Required()
  hotelId: number;
}

