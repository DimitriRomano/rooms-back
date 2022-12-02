import { Prisma } from "@prisma/client";
import { BodyParams, Controller, Inject, ProviderScope, Scope } from "@tsed/common";
import { FeatureHotelModel, FeatureHotelsRepository } from "@tsed/prisma";
import { Patch, Returns } from "@tsed/schema";

@Controller("/feature-hotels")
@Scope(ProviderScope.SINGLETON)
export class FeatureHotelCtrl {
  @Inject()
  protected featureHotelService: FeatureHotelsRepository;

  @Patch("/")
  @Returns(200, Array).Of(FeatureHotelModel)
  async getAll(@BodyParams() args?: Prisma.FeatureHotelFindManyArgs) {
    return this.featureHotelService.findMany(args);
  }
}
