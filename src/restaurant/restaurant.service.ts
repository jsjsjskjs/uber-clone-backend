import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { Restaurant } from './entites/restaurant.entity'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find()
  }
  createRestaurant(
    createRestaurantInput: CreateRestaurantDto
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(
      createRestaurantInput
    )
    return this.restaurantRepository.save(newRestaurant)
  }

  updatedRestaurant({ id, ...data }: UpdateRestaurantDto) {
    this.restaurantRepository.update(id, { ...data })
  }
}
