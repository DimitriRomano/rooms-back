import { Role } from "@prisma/client";

export class AuthUpdate {
  role?: Role;

  firstName?: string;

  lastName?: string;

  image?: string;

  constructor(obj: Partial<AuthUpdate> = {}) {
    Object.assign(this, obj);
  }
}
