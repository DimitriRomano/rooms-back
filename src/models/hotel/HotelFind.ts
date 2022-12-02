import { Prisma } from "@prisma/client";

export class HotelFind implements Prisma.HotelFindManyArgs {
  where?: Prisma.HotelWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.HotelOrderByWithRelationInput>;
  cursor?: Prisma.HotelWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.HotelScalarFieldEnum[];
  include?: Prisma.HotelInclude;
  select?: Prisma.HotelSelect;
  count?: boolean;

  constructor(obj: Partial<HotelFind> = {}) {
    Object.assign(this, obj);
  }
}
