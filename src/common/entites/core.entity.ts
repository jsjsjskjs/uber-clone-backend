import { Field } from '@nestjs/graphql'
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number

  @Field((type) => String)
  @CreateDateColumn()
  createdAt: Date

  @Field((type) => String)
  @UpdateDateColumn()
  updatedAt: Date
}
