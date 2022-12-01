import { Prisma } from "@prisma/client";
import { Controller, Scope, ProviderScope, Inject } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { FeatureCategoryModel } from "@tsed/prisma";
import { Get, Returns, Security, Post, Patch, Delete } from "@tsed/schema";
import { FeatureCategoryService } from "../../services/feature-category/FeatureCategoryService";
import { FeatureCategoryCreation } from "../../models/feature-category/FeatureCategoryCreation";
import { FeatureCategoryUpdate } from "../../models/feature-category/FeatureCategoryUpdate";

@Controller("/feature-categories")
@Scope(ProviderScope.SINGLETON)
export class FeatureCategoryCtrl {
  @Inject()
  protected featureCategoryService: FeatureCategoryService;

  @Get("/")
  @Returns(200, Array).Of(FeatureCategoryModel)
  async getAll(@BodyParams() args?: Prisma.FeatureCategoryFindManyArgs) {
    return this.featureCategoryService.$findMany(args);
  }

  @Get("/:id")
  @Returns(200, FeatureCategoryModel)
  async getOne(@PathParams("id") id: number) {
    return this.featureCategoryService.$findUnique(id);
  }

  @Post("/")
  @Returns(201, FeatureCategoryModel)
  @Security("jwt")
  @Authorize("jwt")
  async create(@BodyParams() featureCategory: FeatureCategoryCreation) {
    return this.featureCategoryService.$create(featureCategory);
  }

  @Patch("/:id")
  @Returns(200, FeatureCategoryModel)
  @Security("jwt")
  @Authorize("jwt")
  async update(@PathParams("id") id: number, @BodyParams() featureCategory: FeatureCategoryUpdate) {
    return this.featureCategoryService.$update(id, featureCategory);
  }

  @Delete("/:id")
  @Returns(200, FeatureCategoryModel)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@PathParams("id") id: number) {
    return this.featureCategoryService.$delete(id);
  }
}
