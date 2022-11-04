import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Auth } from "../client";
import { AuthModel } from "../models";

@Injectable()
export class AuthsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.auth
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Auth | Auth[]): T {
    return deserialize<T>(obj, { type: AuthModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.AuthFindUniqueArgs): Promise<AuthModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<AuthModel | null>(obj);
  }

  async findFirst(args: Prisma.AuthFindFirstArgs): Promise<AuthModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<AuthModel | null>(obj);
  }

  async findMany(args?: Prisma.AuthFindManyArgs): Promise<AuthModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<AuthModel[]>(obj);
  }

  async create(args: Prisma.AuthCreateArgs): Promise<AuthModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<AuthModel>(obj);
  }

  async update(args: Prisma.AuthUpdateArgs): Promise<AuthModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<AuthModel>(obj);
  }

  async upsert(args: Prisma.AuthUpsertArgs): Promise<AuthModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<AuthModel>(obj);
  }

  async delete(args: Prisma.AuthDeleteArgs): Promise<AuthModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<AuthModel>(obj);
  }

  async deleteMany(args: Prisma.AuthDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.AuthUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.AuthAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
