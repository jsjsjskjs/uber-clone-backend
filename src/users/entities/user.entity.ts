import { CoreEntity } from '../../common/entites/core.entity'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import * as bcrypt from 'bcrypt'
import { InternalServerErrorException } from '@nestjs/common'
import { IsEmail, IsEnum } from 'class-validator'

//type UserRole = 'client' | 'owner' | 'delivery'
//Field()를 위한 enum
enum UserRole {
  Client,
  Owner,
  Delivery
}

//graphql을 위한 enum
registerEnumType(UserRole, { name: 'UserRole' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsEmail()
  email: string

  @Field((type) => String)
  @Column()
  password: string

  @Field((type) => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}
