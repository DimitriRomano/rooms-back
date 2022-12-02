import { Prisma } from "@prisma/client";

export class AuthFind implements Prisma.AuthFindManyArgs {
  where?: Prisma.AuthWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.AuthOrderByWithRelationInput>;
  cursor?: Prisma.AuthWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.AuthScalarFieldEnum[];
  include?: Prisma.AuthInclude;
  select?: Prisma.AuthSelect;
  count?: boolean;
}
