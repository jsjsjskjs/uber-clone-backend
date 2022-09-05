import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAccountInput } from './dto/create-account.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
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
}
