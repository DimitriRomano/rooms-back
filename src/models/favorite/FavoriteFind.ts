import { Prisma } from "@prisma/client";

export class FavoriteFind implements Prisma.FavoriteFindManyArgs {
  where?: Prisma.FavoriteWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.FavoriteOrderByWithRelationInput>;
  cursor?: Prisma.FavoriteWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.FavoriteScalarFieldEnum[];
  include?: Prisma.FavoriteInclude;
  select?: Prisma.FavoriteSelect;
  count?: boolean;

  constructor(obj: Partial<FavoriteFind> = {}) {
    Object.assign(this, obj);
  }
}
