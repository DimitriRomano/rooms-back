import { Prisma } from "@prisma/client";
import { BodyParams, Inject } from "@tsed/common";
import { FeatureHotelModel, FeatureHotelsRepository } from "@tsed/prisma";
import { Patch, Returns } from "@tsed/schema";

export class FeatureHotelCtrl {
  @Inject()
  protected featureHotelService: FeatureHotelsRepository;

  @Patch("/")
  @Returns(200, Array).Of(FeatureHotelModel)
  async getAll(@BodyParams() args?: Prisma.FeatureHotelFindManyArgs) {
    return this.featureHotelService.findMany(args);
  }
}
