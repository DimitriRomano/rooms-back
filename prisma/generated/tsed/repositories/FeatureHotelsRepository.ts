import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, FeatureHotel } from "../client";
import { FeatureHotelModel } from "../models";

@Injectable()
export class FeatureHotelsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.featureHotel
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | FeatureHotel | FeatureHotel[]): T {
    return deserialize<T>(obj, { type: FeatureHotelModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.FeatureHotelFindUniqueArgs): Promise<FeatureHotelModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<FeatureHotelModel | null>(obj);
  }

  async findFirst(args: Prisma.FeatureHotelFindFirstArgs): Promise<FeatureHotelModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<FeatureHotelModel | null>(obj);
  }

  async findMany(args?: Prisma.FeatureHotelFindManyArgs): Promise<FeatureHotelModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<FeatureHotelModel[]>(obj);
  }

  async create(args: Prisma.FeatureHotelCreateArgs): Promise<FeatureHotelModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<FeatureHotelModel>(obj);
  }

  async update(args: Prisma.FeatureHotelUpdateArgs): Promise<FeatureHotelModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<FeatureHotelModel>(obj);
  }

  async upsert(args: Prisma.FeatureHotelUpsertArgs): Promise<FeatureHotelModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<FeatureHotelModel>(obj);
  }

  async delete(args: Prisma.FeatureHotelDeleteArgs): Promise<FeatureHotelModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<FeatureHotelModel>(obj);
  }

  async deleteMany(args: Prisma.FeatureHotelDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.FeatureHotelUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.FeatureHotelAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
