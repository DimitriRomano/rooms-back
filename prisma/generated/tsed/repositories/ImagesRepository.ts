import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Image } from "../client";
import { ImageModel } from "../models";

@Injectable()
export class ImagesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.image
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Image | Image[]): T {
    return deserialize<T>(obj, { type: ImageModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ImageFindUniqueArgs): Promise<ImageModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ImageModel | null>(obj);
  }

  async findFirst(args: Prisma.ImageFindFirstArgs): Promise<ImageModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ImageModel | null>(obj);
  }

  async findMany(args?: Prisma.ImageFindManyArgs): Promise<ImageModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ImageModel[]>(obj);
  }

  async create(args: Prisma.ImageCreateArgs): Promise<ImageModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ImageModel>(obj);
  }

  async update(args: Prisma.ImageUpdateArgs): Promise<ImageModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ImageModel>(obj);
  }

  async upsert(args: Prisma.ImageUpsertArgs): Promise<ImageModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ImageModel>(obj);
  }

  async delete(args: Prisma.ImageDeleteArgs): Promise<ImageModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ImageModel>(obj);
  }

  async deleteMany(args: Prisma.ImageDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.ImageUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.ImageAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
