import { Injectable, Inject } from "@tsed/di";
import { AuthModel, PrismaService } from "@tsed/prisma";

@Injectable()
export class AuthService {
  @Inject()
  protected prisma: PrismaService;

  async registerAuth(auth: AuthModel): Promise<AuthModel> {
    return this.prisma.auth.create({
      data: auth
    });
  }
}
