import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { before } from 'node:test';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from 'src/user/user.module';

const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
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
        // UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  // it('/ (GET) Users', async () => {
  //   const response = await request(app.getHttpServer())
  //     .get('/users') // The endpoint to test
  //     .expect(200); // Expect a 200 HTTP status

  //   console.log(response);

  //   return false;
  // });

  // it('/ (POST) Users', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/users') // The endpoint to test
  //     .send({ name: 'John Doe', age: 25 }) // The data to send
  //     .expect(201); // Expect a 201 HTTP status

  //   console.log(response.body);

  //   return false;
  // });

  // it('/ (GET) findUserByName', async () => {
  //   const response = await request(app.getHttpServer()).get(
  //     '/findUserByName/John',
  //   ); // The endpoint to test

  //   console.log(response.body);

  //   // return false;
  // });

  it('/ (GET) find customer by Id', async () => {
    const response = await request(app.getHttpServer())
      .get('/customer/1')
      .expect(200); // The endpoint to test

    console.log(response.body);

    // response.body.expect('This action returns all customer');

    // make sure the name property is equal to 'John Doe'
    expect(response.body.name).toEqual('John Doe');
  });
});
