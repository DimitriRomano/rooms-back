import { Prisma } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { FeatureCategoriesRepository } from "@tsed/prisma";
import { FeatureCategoryCreation } from "src/models/feature-category/FeatureCategoryCreation";
import { FeatureCategoryUpdate } from "src/models/feature-category/FeatureCategoryUpdate";

@Injectable()
export class FeatureCategoryService extends FeatureCategoriesRepository {
  async $findMany(args?: Prisma.FeatureCategoryFindManyArgs | undefined) {
    return this.findMany(args);
  }

  async $findUnique(id: number) {
    return this.findUnique({
      where: {
        id
      }
    });
  }

  async $create(category: FeatureCategoryCreation) {
    const { id } = await this.create({
      data: {
        name: category.name
      }
    });

    return this.$findUnique(id);
  }

  async $update(id: number, category: FeatureCategoryUpdate) {
    await this.update({
      where: {
        id
      },
      data: {
        name: category.name
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
