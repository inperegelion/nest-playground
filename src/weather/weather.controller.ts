import { Controller, Get, Post, Query } from '@nestjs/common';

import { WeatherService } from './weather.service';

import { FindWeatherDto } from './dto/find-weather.dto';
import { SaveWeatherDto } from './dto/save-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  save(@Query() query: SaveWeatherDto) {
    console.log('🏍️', query);

    return this.weatherService.save(query);
  }

  @Get()
  find(@Query() query: FindWeatherDto) {
    console.log('🏍️', query);

    return this.weatherService.find(query);
  }
}
