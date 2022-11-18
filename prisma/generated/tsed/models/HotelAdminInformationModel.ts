import { HotelAdminInformation } from "../client";
import { Integer, Required, Property, CollectionOf } from "@tsed/schema";
import { AuthModel } from "./AuthModel";
import { HotelModel } from "./HotelModel";

export class HotelAdminInformationModel implements HotelAdminInformation {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @Property(() => AuthModel)
  @Required()
  auth: AuthModel;

  @Property(Number)
  @Integer()
  @Required()
  authId: number;

  @CollectionOf(() => HotelModel)
  @Required()
  hotels: HotelModel[];
}

