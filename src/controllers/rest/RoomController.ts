import { Prisma } from "@prisma/client";
import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { RoomModel } from "@tsed/prisma";
import { Delete, Get, Patch, Post, Returns, Security } from "@tsed/schema";
import { RoomCreation } from "../../models/room/RoomCreation";
import { RoomUpdate } from "../../models/room/RoomUpdate";
import { RoomService } from "../../services/room/RoomService";

@Controller("/rooms")
@Scope(ProviderScope.SINGLETON)
export class RoomCtrl {
  @Inject()
  protected roomService: RoomService;

  @Get("/")
  @Returns(200, Array).Of(RoomModel)
  async getAll(@BodyParams() args?: Prisma.RoomFindManyArgs) {
    return this.roomService.$findMany(args);
  }

  @Get("/:id")
  @Returns(200, RoomModel)
  async getOne(@PathParams("id") id: number) {
    return this.roomService.$findUnique(id);
  }

  @Post("/")
  @Returns(201, RoomModel)
  @Security("jwt")
  @Authorize("jwt")
  async create(@BodyParams() room: RoomCreation) {
    return this.roomService.$create(room);
  }

  @Patch("/:id")
  @Returns(200, RoomModel)
  @Security("jwt")
  @Authorize("jwt")
  async update(@PathParams("id") id: number, @BodyParams() room: RoomUpdate) {
    return this.roomService.$update(id, room);
  }

  @Delete("/:id")
  @Returns(200, RoomModel)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@PathParams("id") id: number) {
    return this.roomService.$delete(id);
  }
}
