import { Prisma } from "@prisma/client";

export class FeatureFind implements Prisma.FeatureFindManyArgs {
  where?: Prisma.FeatureWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.FeatureOrderByWithRelationInput>;
  cursor?: Prisma.FeatureWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.FeatureScalarFieldEnum[];
  include?: Prisma.FeatureInclude;
  select?: Prisma.FeatureSelect;
  count?: boolean;
}
