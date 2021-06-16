import { JwtPayload } from "./jwt";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
