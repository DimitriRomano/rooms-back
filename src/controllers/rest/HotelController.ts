import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { HotelModel } from "@tsed/prisma";
import { Delete, Description, Get, Patch, Post, Returns, Security } from "@tsed/schema";
import { HotelCreation } from "../../models/hotel/HotelCreation";
import { HotelFind } from "../../models/hotel/HotelFind";
import { HotelUpdate } from "../../models/hotel/HotelUpdate";
import { HotelService } from "../../services/hotel/HotelService";

@Controller("/hotels")
@Scope(ProviderScope.SINGLETON)
export class HotelCtrl {
  @Inject()
  protected hotelService: HotelService;

  @Patch("/")
  @Description("get many hotels with filter")
  @Returns(200, Array).Of(HotelModel)
  async getAll(@BodyParams() args?: HotelFind) {
    return this.hotelService.$findMany(args);
  }

  @Get("/:id")
  @Description("get one hotel by id")
  @Returns(200, HotelModel)
  async getOne(@PathParams("id") id: number) {
    return this.hotelService.$findUnique(id);
  }

  @Post("/")
  @Description("create a hotel")
  @Security("jwt")
  @Authorize("jwt")
  @Returns(201, HotelModel)
  async create(@BodyParams() hotel: HotelCreation) {
    return this.hotelService.$create(hotel);
  }

  @Patch("/:id")
  @Description("update a hotel")
  @Security("jwt")
  @Authorize("jwt")
  @Returns(200, HotelModel)
  async update(@PathParams("id") id: number, @BodyParams() hotel: HotelUpdate) {
    return this.hotelService.$update(id, hotel);
  }

  @Delete("/:id")
  @Description("delete a hotel")
  @Security("jwt")
  @Authorize("jwt")
  @Returns(200, String)
  async delete(@PathParams("id") id: number) {
    return this.hotelService.$delete(id);
  }
}
