import { QueryDto } from '../dto/query.dto';

import { OpenWeatherData } from './openweather.interface';

export class FormattedWeather {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
}

export type WeatherRecord = QueryDto & { data: OpenWeatherData };
