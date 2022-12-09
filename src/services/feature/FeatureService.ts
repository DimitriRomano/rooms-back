import { Prisma } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { FeaturesRepository } from "@tsed/prisma";
import { FeatureCreation } from "src/models/feature/FeatureCreation";
import { FeatureUpdate } from "src/models/feature/FeatureUpdate";

@Injectable()
export class FeatureService extends FeaturesRepository {
  async $findMany(args?: Prisma.FeatureFindManyArgs | undefined) {
    return this.findMany(args);
  }

  async $findUnique(id: number) {
    return this.findUnique({
      where: {
        id
      }
    });
  }

  async $create(feature: FeatureCreation) {
    const { id } = await this.create({
      data: {
        name: feature.name,
        icon: feature.icon,
        featureCategoryId: feature.categoryId
      }
    });

    return this.$findUnique(id);
  }

  async $update(id: number, feature: FeatureUpdate) {
    await this.update({
      where: {
        id
      },
      data: {
        name: feature.name,
        icon: feature.icon,
        featureCategoryId: feature.categoryId
      }
    });

    return this.$findUnique(id);
  }

  async $delete(id: number) {
    return this.delete({
      where: {
        id
      }
    });
  }
}
