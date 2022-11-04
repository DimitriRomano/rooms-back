import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, FeatureCategory } from "../client";
import { FeatureCategoryModel } from "../models";

@Injectable()
export class FeatureCategoriesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.featureCategory
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | FeatureCategory | FeatureCategory[]): T {
    return deserialize<T>(obj, { type: FeatureCategoryModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.FeatureCategoryFindUniqueArgs): Promise<FeatureCategoryModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<FeatureCategoryModel | null>(obj);
  }

  async findFirst(args: Prisma.FeatureCategoryFindFirstArgs): Promise<FeatureCategoryModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<FeatureCategoryModel | null>(obj);
  }

  async findMany(args?: Prisma.FeatureCategoryFindManyArgs): Promise<FeatureCategoryModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<FeatureCategoryModel[]>(obj);
  }

  async create(args: Prisma.FeatureCategoryCreateArgs): Promise<FeatureCategoryModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<FeatureCategoryModel>(obj);
  }

  async update(args: Prisma.FeatureCategoryUpdateArgs): Promise<FeatureCategoryModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<FeatureCategoryModel>(obj);
  }

  async upsert(args: Prisma.FeatureCategoryUpsertArgs): Promise<FeatureCategoryModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<FeatureCategoryModel>(obj);
  }

  async delete(args: Prisma.FeatureCategoryDeleteArgs): Promise<FeatureCategoryModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<FeatureCategoryModel>(obj);
  }

  async deleteMany(args: Prisma.FeatureCategoryDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.FeatureCategoryUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.FeatureCategoryAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
