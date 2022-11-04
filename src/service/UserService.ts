import { Injectable, Inject } from "@tsed/di";
import { AuthModel, PrismaService } from "@tsed/prisma";

@Injectable()
export class UserService {
  @Inject()
  protected prisma: PrismaService;

  async registerUser(user: { email: string; password: string; username: string }): Promise<AuthModel> {
    return this.prisma.auth.create({
      data: {
        email: user.email,
        password: user.password,
        username: user.username,
        User: {
          create: {
            image: null
          }
        }
      }
    });
  }
}
