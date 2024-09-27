import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import passport from 'passport'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    passport.authenticate('headerapikey', value => {
      if (value) {
        next()
      } else {
        throw new UnauthorizedException('Unauthorized')
      }
    })(req, res, next)
  }
}
