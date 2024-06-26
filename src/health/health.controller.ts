import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkHttp() {
    return this.health.check([
      async () => this.http.pingCheck('http', process.env.API_URL),
      async () => this.mongoose.pingCheck('database'),
      async () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.8 }),
    ]);
  }
}
