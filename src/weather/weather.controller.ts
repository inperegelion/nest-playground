import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { WeatherService } from './weather.service';

import { FindWeatherDto } from './dto/find-weather.dto';
import { SaveWeatherDto } from './dto/save-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async save(@Query() query: SaveWeatherDto, @Res() res: Response) {
    if (!query.lat || !query.lon) {
      return res
        .status(400)
        .send('Missing required query parameters: lat, lon');
    }

    const result = await this.weatherService.save(query);

    if (!result) {
      res
        .status(504)
        .send('Failed to get weather data. Maybe it will work next time.');
    } else {
      res.status(201).json(result);
    }
  }

  @Get()
  async find(@Query() query: FindWeatherDto, @Res() res: Response) {
    if (!query.lat || !query.lon) {
      return res
        .status(400)
        .send('Missing required query parameters: lat, lon');
    }

    const result = await this.weatherService.find(query);

    if (!result) {
      res
        .status(404)
        .send('Weather data not saved. Please save it first. (use POST)');
    } else {
      res.json(result);
    }
  }
}
