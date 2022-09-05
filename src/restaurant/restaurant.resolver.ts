import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { Restaurant } from './entites/restaurant.entity'
import { RestaurantService } from './restaurant.service'

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll()
  }
  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantInput: CreateRestaurantDto
  ): Promise<boolean> {
    console.log(createRestaurantInput)
    try {
      await this.restaurantService.createRestaurant(createRestaurantInput)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('input') updateRestaurantDto: UpdateRestaurantDto
  ): Promise<boolean> {
    try {
      await this.restaurantService.updatedRestaurant(updateRestaurantDto)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
