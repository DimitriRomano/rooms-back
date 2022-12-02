import { Prisma } from "@prisma/client";

export class RoomFind implements Prisma.RoomFindManyArgs {
  where?: { isAvailableAt: Date } & Prisma.RoomWhereInput;

  orderBy?: Prisma.Enumerable<Prisma.RoomOrderByWithRelationInput>;

  cursor?: Prisma.RoomWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.RoomScalarFieldEnum[];
  include?: Prisma.RoomInclude;
  select?: Prisma.RoomSelect;
  count?: boolean;

  constructor(obj: Partial<RoomFind> = {}) {
    Object.assign(this, obj);
  }
}
