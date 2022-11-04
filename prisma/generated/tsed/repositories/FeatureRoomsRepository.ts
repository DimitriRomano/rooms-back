import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, FeatureRoom } from "../client";
import { FeatureRoomModel } from "../models";

@Injectable()
export class FeatureRoomsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.featureRoom
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | FeatureRoom | FeatureRoom[]): T {
    return deserialize<T>(obj, { type: FeatureRoomModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.FeatureRoomFindUniqueArgs): Promise<FeatureRoomModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<FeatureRoomModel | null>(obj);
  }

  async findFirst(args: Prisma.FeatureRoomFindFirstArgs): Promise<FeatureRoomModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<FeatureRoomModel | null>(obj);
  }

  async findMany(args?: Prisma.FeatureRoomFindManyArgs): Promise<FeatureRoomModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<FeatureRoomModel[]>(obj);
  }

  async create(args: Prisma.FeatureRoomCreateArgs): Promise<FeatureRoomModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<FeatureRoomModel>(obj);
  }

  async update(args: Prisma.FeatureRoomUpdateArgs): Promise<FeatureRoomModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<FeatureRoomModel>(obj);
  }

  async upsert(args: Prisma.FeatureRoomUpsertArgs): Promise<FeatureRoomModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<FeatureRoomModel>(obj);
  }

  async delete(args: Prisma.FeatureRoomDeleteArgs): Promise<FeatureRoomModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<FeatureRoomModel>(obj);
  }

  async deleteMany(args: Prisma.FeatureRoomDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.FeatureRoomUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.FeatureRoomAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
