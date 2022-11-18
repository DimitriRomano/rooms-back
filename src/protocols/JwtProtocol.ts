import { Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../services/auth/AuthService";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "eH8v9qpfxVHC00brgf3E4ONtK7NhrfYYfE1i7C5PmVuwACQZvm1YpCCvT2TMw6Sck71ybe7SbVs0dmcdeLxVkkQsPzqzkiJrSwLi",
    issuer: "localhost",
    audience: "localhost"
  }
})
export class JwtProtocol implements OnVerify {
  @Inject()
  authService: AuthService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const auth = this.authService.findOne({
      id: jwtPayload.sub
    });

    if (!auth) {
      throw new Unauthorized("Wrong token");
    }

    req.user = auth;

    return auth;
  }
}
