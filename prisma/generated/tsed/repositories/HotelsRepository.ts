import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Hotel } from "../client";
import { HotelModel } from "../models";

@Injectable()
export class HotelsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.hotel
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Hotel | Hotel[]): T {
    return deserialize<T>(obj, { type: HotelModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.HotelFindUniqueArgs): Promise<HotelModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<HotelModel | null>(obj);
  }

  async findFirst(args: Prisma.HotelFindFirstArgs): Promise<HotelModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<HotelModel | null>(obj);
  }

  async findMany(args?: Prisma.HotelFindManyArgs): Promise<HotelModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<HotelModel[]>(obj);
  }

  async create(args: Prisma.HotelCreateArgs): Promise<HotelModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<HotelModel>(obj);
  }

  async update(args: Prisma.HotelUpdateArgs): Promise<HotelModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<HotelModel>(obj);
  }

  async upsert(args: Prisma.HotelUpsertArgs): Promise<HotelModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<HotelModel>(obj);
  }

  async delete(args: Prisma.HotelDeleteArgs): Promise<HotelModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<HotelModel>(obj);
  }

  async deleteMany(args: Prisma.HotelDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.HotelUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.HotelAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
