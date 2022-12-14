import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: number

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string

  @Field((type) => Boolean, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean

  @Field((type) => String)
  @Column()
  @IsString()
  address: string

  @Field((type) => String)
  @Column()
  @IsString()
  ownerName: string

  @Field((type) => String)
  @Column()
  @IsString()
  categoryName: string
}
