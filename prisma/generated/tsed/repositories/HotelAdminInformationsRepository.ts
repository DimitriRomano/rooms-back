import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, HotelAdminInformation } from "../client";
import { HotelAdminInformationModel } from "../models";

@Injectable()
export class HotelAdminInformationsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.hotelAdminInformation
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | HotelAdminInformation | HotelAdminInformation[]): T {
    return deserialize<T>(obj, { type: HotelAdminInformationModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.HotelAdminInformationFindUniqueArgs): Promise<HotelAdminInformationModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<HotelAdminInformationModel | null>(obj);
  }

  async findFirst(args: Prisma.HotelAdminInformationFindFirstArgs): Promise<HotelAdminInformationModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<HotelAdminInformationModel | null>(obj);
  }

  async findMany(args?: Prisma.HotelAdminInformationFindManyArgs): Promise<HotelAdminInformationModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<HotelAdminInformationModel[]>(obj);
  }

  async create(args: Prisma.HotelAdminInformationCreateArgs): Promise<HotelAdminInformationModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<HotelAdminInformationModel>(obj);
  }

  async update(args: Prisma.HotelAdminInformationUpdateArgs): Promise<HotelAdminInformationModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<HotelAdminInformationModel>(obj);
  }

  async upsert(args: Prisma.HotelAdminInformationUpsertArgs): Promise<HotelAdminInformationModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<HotelAdminInformationModel>(obj);
  }

  async delete(args: Prisma.HotelAdminInformationDeleteArgs): Promise<HotelAdminInformationModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<HotelAdminInformationModel>(obj);
  }

  async deleteMany(args: Prisma.HotelAdminInformationDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.HotelAdminInformationUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.HotelAdminInformationAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
