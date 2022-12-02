import { Prisma } from "@prisma/client";

export class BookingFind implements Prisma.BookingFindManyArgs {
  where?: Prisma.BookingWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.BookingOrderByWithRelationInput>;
  cursor?: Prisma.BookingWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.BookingScalarFieldEnum[];
  include?: Prisma.BookingInclude;
  select?: Prisma.BookingSelect;
  count?: boolean;
}
