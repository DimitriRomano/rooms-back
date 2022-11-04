import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Room } from "../client";
import { RoomModel } from "../models";

@Injectable()
export class RoomsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.room
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Room | Room[]): T {
    return deserialize<T>(obj, { type: RoomModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.RoomFindUniqueArgs): Promise<RoomModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<RoomModel | null>(obj);
  }

  async findFirst(args: Prisma.RoomFindFirstArgs): Promise<RoomModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<RoomModel | null>(obj);
  }

  async findMany(args?: Prisma.RoomFindManyArgs): Promise<RoomModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<RoomModel[]>(obj);
  }

  async create(args: Prisma.RoomCreateArgs): Promise<RoomModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<RoomModel>(obj);
  }

  async update(args: Prisma.RoomUpdateArgs): Promise<RoomModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<RoomModel>(obj);
  }

  async upsert(args: Prisma.RoomUpsertArgs): Promise<RoomModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<RoomModel>(obj);
  }

  async delete(args: Prisma.RoomDeleteArgs): Promise<RoomModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<RoomModel>(obj);
  }

  async deleteMany(args: Prisma.RoomDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.RoomUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.RoomAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
