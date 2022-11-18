import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, AdminInformation } from "../client";
import { AdminInformationModel } from "../models";

@Injectable()
export class AdminInformationsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.adminInformation
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | AdminInformation | AdminInformation[]): T {
    return deserialize<T>(obj, { type: AdminInformationModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.AdminInformationFindUniqueArgs): Promise<AdminInformationModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<AdminInformationModel | null>(obj);
  }

  async findFirst(args: Prisma.AdminInformationFindFirstArgs): Promise<AdminInformationModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<AdminInformationModel | null>(obj);
  }

  async findMany(args?: Prisma.AdminInformationFindManyArgs): Promise<AdminInformationModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<AdminInformationModel[]>(obj);
  }

  async create(args: Prisma.AdminInformationCreateArgs): Promise<AdminInformationModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<AdminInformationModel>(obj);
  }

  async update(args: Prisma.AdminInformationUpdateArgs): Promise<AdminInformationModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<AdminInformationModel>(obj);
  }

  async upsert(args: Prisma.AdminInformationUpsertArgs): Promise<AdminInformationModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<AdminInformationModel>(obj);
  }

  async delete(args: Prisma.AdminInformationDeleteArgs): Promise<AdminInformationModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<AdminInformationModel>(obj);
  }

  async deleteMany(args: Prisma.AdminInformationDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.AdminInformationUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.AdminInformationAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
