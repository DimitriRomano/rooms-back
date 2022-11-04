import { FeatureRoom } from "../client";
import { Integer, Required, Property, Format } from "@tsed/schema";
import { FeatureModel } from "./FeatureModel";
import { RoomModel } from "./RoomModel";

export class FeatureRoomModel implements FeatureRoom {
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

  @Property(() => RoomModel)
  @Required()
  room: RoomModel;

  @Property(Number)
  @Integer()
  @Required()
  roomId: number;
}

