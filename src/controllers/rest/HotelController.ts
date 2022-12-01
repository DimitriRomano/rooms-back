import { Prisma } from "@prisma/client";
import { Controller, Scope, ProviderScope, Inject } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { PathParams, BodyParams } from "@tsed/platform-params";
import { HotelModel } from "@tsed/prisma";
import { Delete, Get, Patch, Post, Returns, Security } from "@tsed/schema";
import { HotelCreation } from "../../models/hotel/HotelCreation";
import { HotelUpdate } from "../../models/hotel/HotelUpdate";
import { HotelService } from "../../services/hotel/HotelService";

@Controller("/hotels")
@Scope(ProviderScope.SINGLETON)
export class HotelCtrl {
  @Inject()
  protected hotelService: HotelService;

  @Get("/")
  @Returns(200, Array).Of(HotelModel)
  async getAll(@BodyParams() args?: Prisma.HotelFindManyArgs) {
    return this.hotelService.$findMany(args);
  }

  @Get("/:id")
  @Returns(200, HotelModel)
  async getOne(@PathParams("id") id: number) {
    return this.hotelService.$findUnique(id);
  }

  @Post("/")
  @Security("jwt")
  @Authorize("jwt")
  @Returns(201, HotelModel)
  async create(@BodyParams() hotel: HotelCreation) {
    return this.hotelService.$create(hotel);
  }

  @Patch("/:id")
  @Security("jwt")
  @Authorize("jwt")
  @Returns(200, HotelModel)
  async update(@PathParams("id") id: number, @BodyParams() hotel: HotelUpdate) {
    return this.hotelService.$update(id, hotel);
  }

  @Delete("/:id")
  @Security("jwt")
  @Authorize("jwt")
  @Returns(200, String)
  async delete(@PathParams("id") id: number) {
    return this.hotelService.$delete(id);
  }
}
