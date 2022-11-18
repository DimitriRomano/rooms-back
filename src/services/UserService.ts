import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "@tsed/prisma";

@Injectable()
export class UserService {
  @Inject()
  protected prisma: PrismaService;

  getAll() {
    return this.prisma.user.findMany();
  }
}
