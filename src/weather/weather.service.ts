import { Injectable } from '@nestjs/common';

import { QueryDto } from './dto/query.dto';
import { Weather } from './interfaces/weather.interface';

type DbRecord = QueryDto & { data: Weather };

@Injectable()
export class WeatherService {
  private readonly db: DbRecord[] = [];
  private readonly MOCK: Weather = {
    sunrise: 1684926645,
    sunset: 1684977332,
    temp: 292.55,
    feels_like: 292.87,
    pressure: 1014,
    humidity: 89,
    uvi: 0.16,
    wind_speed: 3.13,
  };

  private findRecord(query: QueryDto): DbRecord | null {
    if (!query) return null;

    const record = this.db.find(
      (record) =>
        record.lat === query.lat &&
        record.lon === query.lon &&
        record.part === query.part,
    );

    return record ? record : null;
  }

  save(query: QueryDto, data: Weather = this.MOCK): Weather | null {
    if (!query) return null;
    if (!data) return null;

    const existingRecord = this.findRecord(query);

    if (existingRecord) {
      return existingRecord.data;
    }

    if (!existingRecord) {
      this.db.push({ ...query, data });
      return data;
    }

    return null;
  }

  find(query: QueryDto): Weather | null {
    const record = this.findRecord(query);

    return record ? record.data : null;
  }
}
