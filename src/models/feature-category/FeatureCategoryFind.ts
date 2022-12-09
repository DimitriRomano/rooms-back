import { Prisma } from "@prisma/client";

export class FeatureCategoryFind implements Prisma.FeatureCategoryFindManyArgs {
  where?: Prisma.FeatureCategoryWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.FeatureCategoryOrderByWithRelationInput>;
  cursor?: Prisma.FeatureCategoryWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.FeatureCategoryScalarFieldEnum[];
  include?: Prisma.FeatureCategoryInclude;
  select?: Prisma.FeatureCategorySelect;
  count?: boolean;

  constructor(obj: Partial<FeatureCategoryFind> = {}) {
    Object.assign(this, obj);
  }
}
