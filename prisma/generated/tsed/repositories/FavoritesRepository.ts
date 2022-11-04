import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Favorite } from "../client";
import { FavoriteModel } from "../models";

@Injectable()
export class FavoritesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.favorite
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Favorite | Favorite[]): T {
    return deserialize<T>(obj, { type: FavoriteModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.FavoriteFindUniqueArgs): Promise<FavoriteModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<FavoriteModel | null>(obj);
  }

  async findFirst(args: Prisma.FavoriteFindFirstArgs): Promise<FavoriteModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<FavoriteModel | null>(obj);
  }

  async findMany(args?: Prisma.FavoriteFindManyArgs): Promise<FavoriteModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<FavoriteModel[]>(obj);
  }

  async create(args: Prisma.FavoriteCreateArgs): Promise<FavoriteModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<FavoriteModel>(obj);
  }

  async update(args: Prisma.FavoriteUpdateArgs): Promise<FavoriteModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<FavoriteModel>(obj);
  }

  async upsert(args: Prisma.FavoriteUpsertArgs): Promise<FavoriteModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<FavoriteModel>(obj);
  }

  async delete(args: Prisma.FavoriteDeleteArgs): Promise<FavoriteModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<FavoriteModel>(obj);
  }

  async deleteMany(args: Prisma.FavoriteDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.FavoriteUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.FavoriteAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
