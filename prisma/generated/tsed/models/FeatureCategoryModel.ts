import { FeatureCategory } from "../client";
import { Integer, Required, Property, Format, CollectionOf } from "@tsed/schema";
import { FeatureModel } from "./FeatureModel";

export class FeatureCategoryModel implements FeatureCategory {
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

  @CollectionOf(() => FeatureModel)
  @Required()
  Features: FeatureModel[];
}

