import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { FavoriteModel } from "@tsed/prisma";
import { Delete, Description, Get, Patch, Post, Returns, Security } from "@tsed/schema";
import { FavoriteCreation } from "../../models/favorite/FavoriteCreation";
import { FavoriteFind } from "../../models/favorite/FavoriteFind";
import { FavoriteService } from "../../services/favorite/FavoriteService";

@Controller("/favorites")
@Scope(ProviderScope.SINGLETON)
export class FavoriteCtrl {
  @Inject()
  protected favoriteService: FavoriteService;

  @Patch("/")
  @Description("get many favorites with filter")
  @Returns(200, Array).Of(FavoriteModel)
  async getAll(@BodyParams() args?: FavoriteFind) {
    return this.favoriteService.$findMany(args);
  }

  @Get("/:id")
  @Description("get one favorite by id")
  @Returns(200, FavoriteModel)
  async getOne(@PathParams("id") id: number) {
    return this.favoriteService.$findUnique(id);
  }

  @Post("/")
  @Description("create a favorite")
  @Returns(201, FavoriteModel)
  @Security("jwt")
  @Authorize("jwt")
  async create(@BodyParams() favorite: FavoriteCreation) {
    return this.favoriteService.$create(favorite);
  }

  @Delete("/:id")
  @Description("delete a favorite")
  @Returns(200, FavoriteModel)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@PathParams("id") id: number) {
    return this.favoriteService.$delete(id);
  }
}
