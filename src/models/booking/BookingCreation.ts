import { Description, Example, Required } from "@tsed/schema";

export class BookingCreation {
  @Description("Booking start date")
  @Example("2021-01-01")
  checkIn?: Date;

  @Description("Booking end date")
  @Example("2021-01-02")
  checkOut?: Date;

  @Description("Booking room ID")
  @Required()
  @Example(1)
  roomId: number;

  @Description("Booking user ID")
  @Required()
  @Example(1)
  nbPersons: number;

  @Description("Booking user ID")
  @Required()
  @Example(1)
  authId: number;

  constructor(obj: Partial<BookingCreation> = {}) {
    if (!obj.checkIn) {
      obj.checkIn = new Date();
    }
    Object.assign(this, obj);
  }
}
