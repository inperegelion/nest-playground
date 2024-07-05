import { WeatherParts } from 'src/services/openweather/interfaces';

export class QueryDto {
  lat: number;
  lon: number;
  part: WeatherParts[];
}
