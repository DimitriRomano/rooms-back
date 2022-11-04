import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Feature } from "../client";
import { FeatureModel } from "../models";

@Injectable()
export class FeaturesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.feature
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Feature | Feature[]): T {
    return deserialize<T>(obj, { type: FeatureModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.FeatureFindUniqueArgs): Promise<FeatureModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<FeatureModel | null>(obj);
  }

  async findFirst(args: Prisma.FeatureFindFirstArgs): Promise<FeatureModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<FeatureModel | null>(obj);
  }

  async findMany(args?: Prisma.FeatureFindManyArgs): Promise<FeatureModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<FeatureModel[]>(obj);
  }

  async create(args: Prisma.FeatureCreateArgs): Promise<FeatureModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<FeatureModel>(obj);
  }

  async update(args: Prisma.FeatureUpdateArgs): Promise<FeatureModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<FeatureModel>(obj);
  }

  async upsert(args: Prisma.FeatureUpsertArgs): Promise<FeatureModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<FeatureModel>(obj);
  }

  async delete(args: Prisma.FeatureDeleteArgs): Promise<FeatureModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<FeatureModel>(obj);
  }

  async deleteMany(args: Prisma.FeatureDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.FeatureUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.FeatureAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
