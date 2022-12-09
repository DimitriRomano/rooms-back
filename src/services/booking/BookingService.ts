import { Prisma } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { BookingsRepository } from "@tsed/prisma";
import { BookingCreation } from "src/models/booking/BookingCreation";
import { BookingUpdate } from "src/models/booking/BookingUpdate";

@Injectable()
export class BookingService extends BookingsRepository {
  async $findMany(args?: Prisma.BookingFindManyArgs | undefined) {
    return this.findMany(args);
  }

  async $findUnique(id: number) {
    return this.findUnique({
      where: {
        id
      }
    });
  }

  async $create(booking: BookingCreation) {
    const { id } = await this.create({
      data: {
        checkIn: booking.checkIn || new Date(),
        checkOut: booking.checkOut || new Date((booking.checkIn || new Date()).getTime() + 86400000),
        nbPerson: booking.nbPersons,
        authId: booking.authId,
        roomId: booking.roomId
      }
    });

    return this.$findUnique(id);
  }

  async $update(id: number, booking: BookingUpdate) {
    await this.update({
      where: {
        id
      },
      data: {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        nbPerson: booking.nbPersons,
        authId: booking.authId,
        status: booking.status
      }
    });

    return this.$findUnique(id);
  }

  async $delete(id: number) {
    return this.delete({
      where: {
        id
      }
    });
  }
}
