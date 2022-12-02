import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { FeatureModel } from "@tsed/prisma";
import { Delete, Get, Patch, Post, Returns, Security } from "@tsed/schema";
import { FeatureCreation } from "../../models/feature/FeatureCreation";
import { FeatureFind } from "../../models/feature/FeatureFind";
import { FeatureUpdate } from "../../models/feature/FeatureUpdate";
import { FeatureService } from "../../services/feature/FeatureService";

@Controller("/features")
@Scope(ProviderScope.SINGLETON)
export class FeatureCtrl {
  @Inject()
  protected featureService: FeatureService;

  @Patch("/")
  @Returns(200, Array).Of(FeatureModel)
  async getAll(@BodyParams() args?: FeatureFind) {
    return this.featureService.$findMany(args);
  }

  @Get("/:id")
  @Returns(200, FeatureModel)
  async getOne(@PathParams("id") id: number) {
    return this.featureService.$findUnique(id);
  }

  @Post("/")
  @Returns(201, FeatureModel)
  @Security("jwt")
  @Authorize("jwt")
  async create(@BodyParams() feature: FeatureCreation) {
    return this.featureService.$create(feature);
  }

  @Patch("/:id")
  @Returns(200, FeatureModel)
  @Security("jwt")
  @Authorize("jwt")
  async update(@PathParams("id") id: number, @BodyParams() feature: FeatureUpdate) {
    return this.featureService.$update(id, feature);
  }

  @Delete("/:id")
  @Returns(200, FeatureModel)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@PathParams("id") id: number) {
    return this.featureService.$delete(id);
  }
}
