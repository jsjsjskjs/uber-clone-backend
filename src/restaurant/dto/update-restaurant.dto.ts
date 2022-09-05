import { ArgsType, Field, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql'
import { Restaurant } from '../entites/restaurant.entity'

@InputType()
export class UpdateRestaurantDto extends PartialType(Restaurant) {}
