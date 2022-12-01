export class FeatureCategoryUpdate {
  name?: string;

  constructor(obj: Partial<FeatureCategoryUpdate> = {}) {
    Object.assign(this, obj);
  }
}
