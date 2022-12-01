import { Injectable } from "@tsed/di";
import { RoomsRepository } from "@tsed/prisma";
import { RoomUpdate } from "../../models/room/RoomUpdate";
import { RoomCreation } from "../../models/room/RoomCreation";
import { Prisma } from "@prisma/client";

@Injectable()
export class RoomService extends RoomsRepository {
  async $findMany(args?: Prisma.RoomFindManyArgs | undefined) {
    return this.findMany(args);
  }

  async $findUnique(id: number) {
    return this.findUnique({
      where: {
        id
      }
    });
  }

  async $create(room: RoomCreation) {
    const { id } = await this.create({
      data: {
        name: room.name,
        description: room.description || "",
        price: room.price,
        isAvailable: true,
        images: room.images,
        nbBed: room.nbBed,
        capacity: room.capacity,
        hotelId: room.hotelId
      }
    });

    await this.prisma.featureRoom.createMany({
      data: room.featuresIds.map((featureId) => ({
        featureId,
        roomId: id
      }))
    });

    return this.$findUnique(id);
  }

  async $update(id: number, room: RoomUpdate) {
    await this.update({
      where: {
        id
      },
      data: {
        name: room.name,
        description: room.description || "",
        price: room.price
      }
    });

    await this.prisma.featureRoom.deleteMany({
      where: {
        roomId: id
      }
    });

    await this.prisma.featureRoom.createMany({
      data: room.featuresIds.map((featureId) => ({
        featureId,
        roomId: id
      }))
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
