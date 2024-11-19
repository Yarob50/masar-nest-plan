import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
// import { RedisService } from './redis/redis.service';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';

const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';
console.log(entitiesPath);
@Module({
  imports: [
    // ConfigM
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '',
    //   database: 'masar-plan',
    //   autoLoadEntities: true,
    //   entities: [entitiesPath],
    //   synchronize: true,
    //   logging: false,
    // }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [entitiesPath],
      synchronize: true,
      logging: false,
      dropSchema: false,
    }),

    UserModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // RedisService
  ],
})
export class AppModule {}
