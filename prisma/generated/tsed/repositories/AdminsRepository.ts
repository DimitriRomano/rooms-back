import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Admin } from "../client";
import { AdminModel } from "../models";

@Injectable()
export class AdminsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.admin
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Admin | Admin[]): T {
    return deserialize<T>(obj, { type: AdminModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.AdminFindUniqueArgs): Promise<AdminModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<AdminModel | null>(obj);
  }

  async findFirst(args: Prisma.AdminFindFirstArgs): Promise<AdminModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<AdminModel | null>(obj);
  }

  async findMany(args?: Prisma.AdminFindManyArgs): Promise<AdminModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<AdminModel[]>(obj);
  }

  async create(args: Prisma.AdminCreateArgs): Promise<AdminModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<AdminModel>(obj);
  }

  async update(args: Prisma.AdminUpdateArgs): Promise<AdminModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<AdminModel>(obj);
  }

  async upsert(args: Prisma.AdminUpsertArgs): Promise<AdminModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<AdminModel>(obj);
  }

  async delete(args: Prisma.AdminDeleteArgs): Promise<AdminModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<AdminModel>(obj);
  }

  async deleteMany(args: Prisma.AdminDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.AdminUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.AdminAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
