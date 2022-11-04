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

  async refreshAuthToken(user: { email: string; password: string }): Promise<string> {
    return this.prisma.auth
      .findUnique({
        where: {
          email: user.email
        }
      })
      .then((auth: AuthModel) => {
        if (auth.password === user.password) {
          // TODO generate token
          const token = "token";
          this.prisma.auth.update({
            where: {
              id: auth.id
            },
            data: {
              token: token
            }
          });
          return token;
        }
      });
  }
}
