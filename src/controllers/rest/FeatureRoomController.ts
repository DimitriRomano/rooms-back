import { Prisma } from "@prisma/client";
import { BodyParams, Inject } from "@tsed/common";
import { FeatureRoomModel, FeatureRoomsRepository } from "@tsed/prisma";
import { Patch, Returns } from "@tsed/schema";

export class FeatureRoomCtrl {
  @Inject()
  protected featureRoomService: FeatureRoomsRepository;

  @Patch("/")
  @Returns(200, Array).Of(FeatureRoomModel)
  async getAll(@BodyParams() args?: Prisma.FeatureRoomFindManyArgs) {
    return this.featureRoomService.findMany(args);
  }
}
