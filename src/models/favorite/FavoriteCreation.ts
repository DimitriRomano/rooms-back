import { Required, Example, Description } from "@tsed/schema";

export class FavoriteCreation {
  @Description("Favorite user ID")
  @Required()
  @Example(1)
  authId: number;

  @Description("Favorite hotel ID")
  @Required()
  @Example(1)
  hotelId: number;

  constructor(obj: Partial<FavoriteCreation> = {}) {
    Object.assign(this, obj);
  }
}
