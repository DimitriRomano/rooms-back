import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { BookingModel } from "@tsed/prisma";
import { Delete, Get, Patch, Post, Returns, Security } from "@tsed/schema";
import { BookingCreation } from "../../models/booking/BookingCreation";
import { BookingFind } from "../../models/booking/BookingFind";
import { BookingUpdate } from "../../models/booking/BookingUpdate";
import { BookingService } from "../../services/booking/BookingService";

@Controller("/bookings")
@Scope(ProviderScope.SINGLETON)
export class BookingCtrl {
  @Inject()
  protected bookingService: BookingService;

  @Patch("/")
  @Returns(200, Array).Of(BookingModel)
  async getAll(@BodyParams() args?: BookingFind) {
    return this.bookingService.$findMany(args);
  }

  @Get("/:id")
  @Returns(200, BookingModel)
  async getOne(@PathParams("id") id: number) {
    return this.bookingService.$findUnique(id);
  }

  @Post("/")
  @Returns(201, BookingModel)
  @Security("jwt")
  @Authorize("jwt")
  async create(@BodyParams() booking: BookingCreation) {
    return this.bookingService.$create(booking);
  }

  @Patch("/:id")
  @Returns(200, BookingModel)
  @Security("jwt")
  @Authorize("jwt")
  async update(@PathParams("id") id: number, @BodyParams() booking: BookingUpdate) {
    return this.bookingService.$update(id, booking);
  }

  @Delete("/:id")
  @Returns(200, BookingModel)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@PathParams("id") id: number) {
    return this.bookingService.$delete(id);
  }
}
