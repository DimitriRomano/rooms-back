import { Prisma } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { FavoritesRepository } from "@tsed/prisma";
import { FavoriteCreation } from "../../models/favorite/FavoriteCreation";

@Injectable()
export class FavoriteService extends FavoritesRepository {
  async $findMany(args?: Prisma.FavoriteFindManyArgs | undefined) {
    return this.findMany(args);
  }

  async $findUnique(id: number) {
    return this.findUnique({
      where: {
        id
      }
    });
  }

  async $create(favorite: FavoriteCreation) {
    const { id } = await this.create({
      data: {
        authId: favorite.authId,
        hotelId: favorite.hotelId
      }
    });

    return this.$findUnique(id);
  }

  async $delete(id: number) {
    return this.delete({
      where: {
        id
      }
    });
  }
}
