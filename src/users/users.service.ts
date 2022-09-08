import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAccountInput } from './dto/create-account.dto'
import { LoginInput } from './dto/login.dto'
import { User } from './entities/user.entity'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '../jwt/jwt.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async createAccount({
    email,
    password,
    role
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } })
      if (exists) {
        return { ok: false, error: '해당 이메일을 가진 사용자가 존재합니다' }
      }
      await this.users.save(this.users.create({ email, password, role }))
      return { ok: true }
    } catch (error) {
      console.log(error)
      return { ok: false, error: '계정을 생성할 수 없음' }
    }
  }

  async login({
    email,
    password
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ where: { email } })
      if (!user) {
        return {
          ok: false,
          error: '사용자를 찾을 수 없습니다'
        }
      }
      const passwordCorrect = await user.checkPassword(password)
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '잘못된 비밀번호입니다'
        }
      }
      const token = this.jwtService.sign({ id: user.id })
      return {
        ok: true,
        token
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }
  }
}
