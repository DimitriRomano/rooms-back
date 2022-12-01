export class FeatureUpdate {
  name?: string;
  icon?: string;
  categoryId?: number;

  constructor(obj: Partial<FeatureUpdate> = {}) {
    Object.assign(this, obj);
  }
}
