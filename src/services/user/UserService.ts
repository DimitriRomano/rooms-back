import { Injectable } from "@tsed/di";
import { UserInformationsRepository } from "@tsed/prisma";

@Injectable()
export class UserService extends UserInformationsRepository {
  getAll() {
    return this.prisma.userInformation.findMany();
  }
}
