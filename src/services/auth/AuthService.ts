import { Auth, Prisma } from "@prisma/client";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "@tsed/prisma";
import { AuthCreation } from "src/models/AuthCreation";
import { hash, compare } from "bcrypt";

@Injectable()
export class AuthService {
  hashSecret = "otocThZdutSrd11jHLk5snnxHx0ChNd01S1P0n6kiC6vAx9GA7d2fkOIRwO7J8bq4K95qXkx0ziS6iwis8c1UXGGxaPsHdk6Flfw";

  async hashPassword(plaintextPassword: string) {
    return new Promise<string>((resolve, reject) => {
      hash(plaintextPassword, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  async attachToken(auth: Auth, token: string) {
    return await this.prisma.auth.update({
      where: { id: auth.id },
      data: { token }
    });
  }

  @Inject()
  protected prisma: PrismaService;

  async create(auth: AuthCreation): Promise<Auth> {
    return this.prisma.auth.create({
      data: {
        email: auth.email,
        password: auth.password,
        role: auth.role
      }
    });
  }

  async findOne(where: Prisma.AuthWhereUniqueInput): Promise<Auth | null> {
    return this.prisma.auth.findUnique({
      where
    });
  }

  verifyPassword(auth: Auth, plaintextPassword: string) {
    return new Promise<boolean>((resolve, reject) => {
      compare(plaintextPassword, auth.password, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
