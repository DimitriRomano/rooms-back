import { Status } from "@tsed/prisma";

export class BookingUpdate {
  checkIn?: Date;
  checkOut?: Date;
  nbPersons?: number;
  authId?: number;
  status?: Status;
  constructor(obj: Partial<BookingUpdate> = {}) {
    Object.assign(this, obj);
  }
}
