import { Auth, Prisma } from "@prisma/client";
import { Injectable } from "@tsed/di";
import { AuthsRepository } from "@tsed/prisma";
import { compare, hash } from "bcrypt";
import { AuthCreation } from "../../models/auth/AuthCreation";
import { AuthUpdate } from "../../models/auth/AuthUpdate";

@Injectable()
export class AuthService extends AuthsRepository {
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

  async $create(auth: AuthCreation): Promise<Auth> {
    return this.prisma.auth.create({
      data: {
        email: auth.email,
        password: auth.password,
        role: auth.role,
        firstName: auth.firstName,
        lastName: auth.lastName
      }
    });
  }

  async findOne(where: Prisma.AuthWhereUniqueInput): Promise<Auth | null> {
    return this.prisma.auth.findUnique({
      where
    });
  }

  async verifyPassword(auth: Auth, plaintextPassword: string) {
    return new Promise<boolean>((resolve, reject) => {
      compare(plaintextPassword, auth.password, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  async logout(auth: Auth) {
    return await this.prisma.auth.update({
      where: { id: auth.id },
      data: { token: null }
    });
  }

  async resetPassword(auth: Auth, newPassword: string) {
    const encryptedPassword = await this.hashPassword(newPassword);
    return await this.prisma.auth.update({
      where: { id: auth.id },
      data: { password: encryptedPassword }
    });
  }

  async $update(id: number, auth: AuthUpdate) {
    return this.update({
      where: {
        id
      },
      data: {
        role: auth.role,
        firstName: auth.firstName,
        lastName: auth.lastName
      }
    });
  }

  async $delete(id: number) {
    return this.delete({
      where: {
        id
      }
    });
  }

  async $findMany(args?: Prisma.AuthFindManyArgs | undefined) {
    return this.findMany(args);
  }

  async $findUnique(id: number) {
    return this.findUnique({
      where: {
        id
      }
    });
  }
}
