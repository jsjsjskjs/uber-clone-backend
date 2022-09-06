import { DynamicModule, Global, Module } from '@nestjs/common'
import { JWT_CONFIG_OPTIONS } from './jwt.constants'
import { JwtModuleOptions } from './jwt.interfaces'
import { JwtService } from './jwt.service'

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        JwtService,
        { provide: JWT_CONFIG_OPTIONS, useValue: options }
      ]
    }
  }
}
