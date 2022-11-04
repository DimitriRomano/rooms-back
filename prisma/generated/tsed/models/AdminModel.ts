import { Admin } from "../client";
import { Integer, Required, Property } from "@tsed/schema";
import { AuthModel } from "./AuthModel";

export class AdminModel implements Admin {
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
}

