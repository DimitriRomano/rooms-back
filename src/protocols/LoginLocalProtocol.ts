import { Auth } from "@prisma/client";
import { BodyParams, Constant, Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import * as jwt from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { Credentials } from "../models/Credentials";
import { AuthService } from "../services/auth/AuthService";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify {
  @Inject()
  authService: AuthService;

  @Constant("passport.protocols.jwt.settings")
  jwtSettings: any;

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const auth = await this.authService.findOne({ email });

    if (!auth) {
      throw new Unauthorized("Wrong credentials");
    }

    if (!(await this.authService.verifyPassword(auth, password))) {
      throw new Unauthorized("Wrong credentials");
    }

    const token = this.createJwt(auth);
    this.authService.attachToken(auth, token);

    return auth;
  }

  createJwt(auth: Auth) {
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: auth.id,
        exp: now + maxAge * 1000,
        iat: now
      },
      secretOrKey
    );
  }
}
