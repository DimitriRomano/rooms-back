import { Prisma } from "@prisma/client";
import { Injectable } from "@tsed/common";
import { HotelsRepository } from "@tsed/prisma";
import { HotelCreation } from "src/models/hotel/HotelCreation";
import { HotelUpdate } from "../../models/hotel/HotelUpdate";

@Injectable()
export class HotelService extends HotelsRepository {
  async $findMany(args?: Prisma.HotelFindManyArgs | undefined) {
    return this.findMany(args);
  }

  async $findUnique(id: number) {
    return this.findUnique({
      where: {
        id
      }
    });
  }

  async $create(hotel: HotelCreation) {
    const { id } = await this.create({
      data: {
        name: hotel.name,
        address: hotel.address,
        city: hotel.city,
        zip: hotel.zip,
        country: hotel.country,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        phone: hotel.phone || "",
        email: hotel.email,
        website: hotel.website || "",
        description: hotel.description || "",
        authId: hotel.authId,
        state: hotel.state,
        images: hotel.images
      }
    });

    await this.prisma.featureHotel.createMany({
      data: hotel.featuresIds.map((featureId) => ({
        featureId,
        hotelId: id
      }))
    });

    return this.$findUnique(id);
  }

  async $update(id: number, hotel: HotelUpdate) {
    await this.update({
      where: {
        id
      },
      data: {
        name: hotel.name,
        address: hotel.address,
        city: hotel.city,
        zip: hotel.zip,
        country: hotel.country,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        phone: hotel.phone || "",
        email: hotel.email,
        website: hotel.website || "",
        description: hotel.description || "",
        authId: hotel.authId,
        state: hotel.state,
        images: hotel.images
      }
    });

    if (hotel.featuresIds) {
      await this.prisma.featureHotel.deleteMany({
        where: {
          hotelId: id
        }
      });

      await this.prisma.featureHotel.createMany({
        data: hotel.featuresIds.map((featureId) => ({
          featureId,
          hotelId: id
        }))
      });
    }

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
