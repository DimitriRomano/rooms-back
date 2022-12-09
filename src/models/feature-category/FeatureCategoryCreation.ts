import { Description, Required, Example } from "@tsed/schema";

export class FeatureCategoryCreation {
  @Description("Feature Category name")
  @Required()
  @Example("Service")
  name: string;

  constructor(obj: Partial<FeatureCategoryCreation> = {}) {
    Object.assign(this, obj);
  }
}
