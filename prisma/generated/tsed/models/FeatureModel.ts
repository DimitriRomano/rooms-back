import { Feature } from "../client";
import { Integer, Required, Property, Format, Allow, CollectionOf } from "@tsed/schema";
import { FeatureHotelModel } from "./FeatureHotelModel";
import { FeatureRoomModel } from "./FeatureRoomModel";
import { FeatureCategoryModel } from "./FeatureCategoryModel";

export class FeatureModel implements Feature {
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
  name: string;

  @Property(String)
  @Allow(null)
  icon: string | null;

  @CollectionOf(() => FeatureHotelModel)
  @Required()
  FeatureHotel: FeatureHotelModel[];

  @CollectionOf(() => FeatureRoomModel)
  @Required()
  FeatureRoom: FeatureRoomModel[];

  @Property(() => FeatureCategoryModel)
  @Allow(null)
  FeatureCategory: FeatureCategoryModel | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  featureCategoryId: number | null;
}

