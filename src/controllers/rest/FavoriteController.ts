import { Prisma } from "@prisma/client";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { FavoriteModel } from "@tsed/prisma";
import { Delete, Get, Post, Returns, Security } from "@tsed/schema";
import { FavoriteService } from "src/services/favorite/FavoriteService";
import { FavoriteCreation } from "../../models/favorite/FavoriteCreation";

@Controller("/favorites")
@Scope(ProviderScope.SINGLETON)
export class FavoriteCtrl {
  @Inject()
  protected favoriteService: FavoriteService;

  @Get("/")
  @Returns(200, Array).Of(FavoriteModel)
  async getAll(@BodyParams() args?: Prisma.FavoriteFindManyArgs) {
    return this.favoriteService.$findMany(args);
  }

  @Get("/:id")
  @Returns(200, FavoriteModel)
  async getOne(@PathParams("id") id: number) {
    return this.favoriteService.$findUnique(id);
  }

  @Post("/")
  @Returns(201, FavoriteModel)
  @Security("jwt")
  @Authorize("jwt")
  async create(@BodyParams() favorite: FavoriteCreation) {
    return this.favoriteService.$create(favorite);
  }

  @Delete("/:id")
  @Returns(200, FavoriteModel)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@PathParams("id") id: number) {
    return this.favoriteService.$delete(id);
  }
}
