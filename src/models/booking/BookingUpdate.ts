export class BookingUpdate {
  checkIn?: Date;
  checkOut?: Date;
  nbPersons?: number;
  authId?: number;
  constructor(obj: Partial<BookingUpdate> = {}) {
    Object.assign(this, obj);
  }
}
