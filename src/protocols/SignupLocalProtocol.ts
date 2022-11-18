import { Auth } from "@prisma/client";
import { BodyParams, Constant, Inject, Req } from "@tsed/common";
import { Forbidden } from "@tsed/exceptions";
import { OnVerify, Protocol } from "@tsed/passport";
import * as jwt from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { AuthCreation } from "../models/AuthCreation";
import { AuthService } from "../services/auth/AuthService";

@Protocol<IStrategyOptions>({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class SignupLocalProtocol implements OnVerify {
  @Inject()
  authService: AuthService;

  @Constant("passport.protocols.jwt.settings")
  jwtSettings: any;

  async $onVerify(@Req() request: Req, @BodyParams() newAuth: AuthCreation) {
    const { email, password } = newAuth;

    const encryptedPassword = await this.authService.hashPassword(password);

    const found = await this.authService.findOne({ email });

    if (found) {
      throw new Forbidden("Email is already registered");
    }

    const auth = await this.authService.create({ ...newAuth, password: encryptedPassword });

    const token = this.createJwt(auth);

    return this.authService.attachToken(auth, token);
  }

  createJwt(auth: Auth) {
    console.log("=========================== TOKEN ===========================");
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    const token = jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: auth.id,
        exp: now + maxAge * 1000,
        iat: now
      },
      secretOrKey
    );
    console.log(token);
    console.log("=========================== TOKEN ===========================");
    return token;
  }
}
