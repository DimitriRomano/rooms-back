import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Booking } from "../client";
import { BookingModel } from "../models";

@Injectable()
export class BookingsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.booking
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Booking | Booking[]): T {
    return deserialize<T>(obj, { type: BookingModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.BookingFindUniqueArgs): Promise<BookingModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<BookingModel | null>(obj);
  }

  async findFirst(args: Prisma.BookingFindFirstArgs): Promise<BookingModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<BookingModel | null>(obj);
  }

  async findMany(args?: Prisma.BookingFindManyArgs): Promise<BookingModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<BookingModel[]>(obj);
  }

  async create(args: Prisma.BookingCreateArgs): Promise<BookingModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<BookingModel>(obj);
  }

  async update(args: Prisma.BookingUpdateArgs): Promise<BookingModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<BookingModel>(obj);
  }

  async upsert(args: Prisma.BookingUpsertArgs): Promise<BookingModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<BookingModel>(obj);
  }

  async delete(args: Prisma.BookingDeleteArgs): Promise<BookingModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<BookingModel>(obj);
  }

  async deleteMany(args: Prisma.BookingDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.BookingUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.BookingAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
