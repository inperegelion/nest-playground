import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hello NestJS</title>
        </head>
        <body>
          <h1>Hello, checkout this little NestJS app!</h1>
          <p>Test these app routes:</p>
          <ul>
            <li>use  GET to read existing record for entry <br/> <a href="/weather?lat=49&lon=23&part=hourly">/weather?lat=49&lon=123&part=hourly</a></li>
            <li>use POST to check the fresh data for entry <br/> <a href="/weather?lat=49&lon=23&part=hourly">/weather?lat=49&lon=123&part=hourly</a></li>
          </ul>
        </body>
      </html>
    `;
  }
}
