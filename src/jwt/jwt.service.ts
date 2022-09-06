import { Inject, Injectable } from '@nestjs/common'
import { JWT_CONFIG_OPTIONS } from './jwt.constants'
import { JwtModuleOptions } from './jwt.interfaces'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_CONFIG_OPTIONS) private readonly options: JwtModuleOptions
  ) {
    console.log(options)
  }
  sign(payload: object): string {
    return jwt.sign(payload, this.options.privateKey)
  }
}
