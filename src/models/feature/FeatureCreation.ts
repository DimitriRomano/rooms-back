import { Description, Required, Example } from "@tsed/schema";

export class FeatureCreation {
  @Description("Feature name")
  @Required()
  @Example("Laundry")
  name: string;

  @Description("Feature icon url")
  @Required()
  @Example("https://icon")
  icon: string;

  @Description("Feature Category ID")
  @Required()
  @Example(1)
  categoryId: number;

  constructor(obj: Partial<FeatureCreation> = {}) {
    Object.assign(this, obj);
  }
}
