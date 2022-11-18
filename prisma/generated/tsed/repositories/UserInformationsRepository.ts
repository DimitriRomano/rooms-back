import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, UserInformation } from "../client";
import { UserInformationModel } from "../models";

@Injectable()
export class UserInformationsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.userInformation
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | UserInformation | UserInformation[]): T {
    return deserialize<T>(obj, { type: UserInformationModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.UserInformationFindUniqueArgs): Promise<UserInformationModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<UserInformationModel | null>(obj);
  }

  async findFirst(args: Prisma.UserInformationFindFirstArgs): Promise<UserInformationModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<UserInformationModel | null>(obj);
  }

  async findMany(args?: Prisma.UserInformationFindManyArgs): Promise<UserInformationModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<UserInformationModel[]>(obj);
  }

  async create(args: Prisma.UserInformationCreateArgs): Promise<UserInformationModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<UserInformationModel>(obj);
  }

  async update(args: Prisma.UserInformationUpdateArgs): Promise<UserInformationModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<UserInformationModel>(obj);
  }

  async upsert(args: Prisma.UserInformationUpsertArgs): Promise<UserInformationModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<UserInformationModel>(obj);
  }

  async delete(args: Prisma.UserInformationDeleteArgs): Promise<UserInformationModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<UserInformationModel>(obj);
  }

  async deleteMany(args: Prisma.UserInformationDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.UserInformationUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.UserInformationAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
