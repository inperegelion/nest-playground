import { Injectable } from '@nestjs/common';
import {
  WeatherParts,
  OpenWeatherData,
} from './interfaces/openweather.interface';
import { MOCK } from './mock';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';

@Injectable()
export class OpenWeatherService {
  private static readonly origin = 'https://api.openweathermap.org/data/3.0';

  static async onecall(
    lat: number,
    lon: number,
    part: WeatherParts[] = ['alerts', 'daily', 'hourly', 'minutely'],
  ) {
    if (OPENWEATHER_API_KEY === '') return MOCK;

    // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    const response = await fetch(
      `${this.origin}/onecall?lat=${lat}&lon=${lon}&exclude=${part.join(',')}&appid=${OPENWEATHER_API_KEY}`,
    );
    const data = (await response.json()) as OpenWeatherData;
    return data;
  }
}
