import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import {
  CreateAccountInput,
  CreateAccountOutput
} from './dto/create-account.dto'
import { LoginInput, LoginOutput } from './dto/login.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    try {
      return await this.usersService.createAccount(createAccountInput)
    } catch (error) {
      return { ok: false, error }
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return await this.usersService.login(loginInput)
    } catch (error) {
      return { ok: false, error }
    }
  }

  //make middleware
  @Query((returns) => User)
  me(@Context() context) {
    console.log(context.user)
  }
}
