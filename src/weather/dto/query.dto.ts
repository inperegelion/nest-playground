import { WeatherParts } from '../interfaces/openweather.interface';

export class QueryDto {
  lat: number;
  lon: number;
  part: WeatherParts[];
}
