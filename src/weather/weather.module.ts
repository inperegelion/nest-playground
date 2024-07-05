import { Module } from '@nestjs/common';

import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { OpenWeatherService } from './openweather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, OpenWeatherService],
})
export class WeatherModule {}
