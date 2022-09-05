import { CoreEntity } from '../../common/entites/core.entity'
import { Column, Entity } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ClientRequest } from 'http'

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
  email: string

  @Field((type) => String)
  @Column()
  password: string

  @Field((type) => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole
}
