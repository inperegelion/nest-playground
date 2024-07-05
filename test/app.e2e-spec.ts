import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/weather (GET) without query params', () => {
    return request(app.getHttpServer())
      .get('/weather')
      .expect(400)
      .expect('Missing required query parameters: lat, lon');
  });

  it('/weather (GET) with for lat=0 lon=0, never saved before', () => {
    return request(app.getHttpServer())
      .get('/weather?lat=0&lon=0')
      .expect(404)
      .expect('Weather data not saved. Please save it first. (use POST)');
  });

  it('/weather (POST) without query params', () => {
    return request(app.getHttpServer())
      .post('/weather')
      .expect(400)
      .expect('Missing required query parameters: lat, lon');
  });

  it('/weather (POST) with for lat=48 lon=28 created', () => {
    return request(app.getHttpServer())
      .post('/weather?lat=48&lon=28')
      .expect(201);
  });
});
