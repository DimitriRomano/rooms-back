import { Controller, Inject, ProviderScope, Scope } from "@tsed/di";
import { Authorize } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { RoomModel } from "@tsed/prisma";
import { Delete, Description, Get, Patch, Post, Returns, Security } from "@tsed/schema";
import { RoomFind } from "../../models/room/RoomFind";
import { RoomCreation } from "../../models/room/RoomCreation";
import { RoomUpdate } from "../../models/room/RoomUpdate";
import { RoomService } from "../../services/room/RoomService";

@Controller("/rooms")
@Scope(ProviderScope.SINGLETON)
export class RoomCtrl {
  @Inject()
  protected roomService: RoomService;

  @Patch("/")
  @Description("get many rooms with filter")
  @Returns(200, Array).Of(RoomModel)
  async getAll(@BodyParams() args?: RoomFind) {
    return this.roomService.$findMany(args);
  }

  @Get("/:id")
  @Description("get one room by id")
  @Returns(200, RoomModel)
  async getOne(@PathParams("id") id: number) {
    return this.roomService.$findUnique(id);
  }

  @Post("/")
  @Description("create a room")
  @Returns(201, RoomModel)
  @Security("jwt")
  @Authorize("jwt")
  async create(@BodyParams() room: RoomCreation) {
    return this.roomService.$create(room);
  }

  @Patch("/:id")
  @Description("update a room")
  @Returns(200, RoomModel)
  @Security("jwt")
  @Authorize("jwt")
  async update(@PathParams("id") id: number, @BodyParams() room: RoomUpdate) {
    return this.roomService.$update(id, room);
  }

  @Delete("/:id")
  @Description("delete a room")
  @Returns(200, RoomModel)
  @Security("jwt")
  @Authorize("jwt")
  async delete(@PathParams("id") id: number) {
    return this.roomService.$delete(id);
  }
}
