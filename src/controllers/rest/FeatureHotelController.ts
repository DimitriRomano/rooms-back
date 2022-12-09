import { Prisma } from "@prisma/client";
import { BodyParams, Controller, Inject, ProviderScope, Scope } from "@tsed/common";
import { FeatureHotelModel, FeatureHotelsRepository } from "@tsed/prisma";
import { Description, Patch, Returns } from "@tsed/schema";

@Controller("/feature-hotels")
@Scope(ProviderScope.SINGLETON)
export class FeatureHotelCtrl {
  @Inject()
  protected featureHotelService: FeatureHotelsRepository;

  @Patch("/")
  @Description("get many featureHotels with filter")
  @Returns(200, Array).Of(FeatureHotelModel)
  async getAll(@BodyParams() args?: Prisma.FeatureHotelFindManyArgs) {
    return this.featureHotelService.findMany(args);
  }
}
