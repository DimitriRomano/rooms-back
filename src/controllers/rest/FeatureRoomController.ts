import { Prisma } from "@prisma/client";
import { BodyParams, Controller, Inject, ProviderScope, Scope } from "@tsed/common";
import { FeatureRoomModel, FeatureRoomsRepository } from "@tsed/prisma";
import { Description, Patch, Returns } from "@tsed/schema";

@Controller("/feature-rooms")
@Scope(ProviderScope.SINGLETON)
export class FeatureRoomCtrl {
  @Inject()
  protected featureRoomService: FeatureRoomsRepository;

  @Patch("/")
  @Description("get many featureRooms with filter")
  @Returns(200, Array).Of(FeatureRoomModel)
  async getAll(@BodyParams() args?: Prisma.FeatureRoomFindManyArgs) {
    return this.featureRoomService.findMany(args);
  }
}
