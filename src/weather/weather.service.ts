import { Injectable } from '@nestjs/common';

import { QueryDto } from './dto/query.dto';
import { OpenWeatherData } from './interfaces/openweather.interface';
import { OpenWeatherService } from './openweather.service';

type WeatherRecord = QueryDto & { data: OpenWeatherData };

@Injectable()
export class WeatherService {
  constructor(private openWeatherService: OpenWeatherService) {}
  private readonly db: WeatherRecord[] = [];

  private async findRecord(
    query: QueryDto,
  ): Promise<{ record: WeatherRecord | null; index: number }> {
    const index = this.db.findIndex(
      (record) =>
        record.lat === query.lat &&
        record.lon === query.lon &&
        record.part === query.part,
    );
    if (index === -1) return { record: null, index };
    return { record: this.db[index], index };
  }

  private async saveRecord(
    query: QueryDto,
    data: OpenWeatherData,
  ): Promise<WeatherRecord> {
    const { record: existingRecord, index } = await this.findRecord(query);
    if (existingRecord) {
      this.db[index].data = data;
      return this.db[index];
    } else {
      const record = { ...query, data };
      this.db.push(record);
      return record;
    }
  }

  private async getWeatherData(
    query: QueryDto,
  ): Promise<OpenWeatherData | null> {
    return await OpenWeatherService.onecall(query.lat, query.lon, query.part);
  }

  public async save(query: QueryDto): Promise<WeatherRecord | null> {
    if (!query) return null;

    const data = await this.getWeatherData(query);
    if (!data) return null;

    return await this.saveRecord(query, data);
  }

  public async find(query: QueryDto): Promise<WeatherRecord | null> {
    const { record } = await this.findRecord(query);
    return record;
  }
}
