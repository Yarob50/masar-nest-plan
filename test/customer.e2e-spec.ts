// tests/e2e/customers.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';

const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  //   beforeAll(async () => {
  //     const moduleFixture: TestingModule = await Test.createTestingModule({
  //       imports: [
  //         AppModule,

  //         // TypeOrmModule.forRoot({
  //         //   type: 'postgres',
  //         //   host: 'localhost',
  //         //   port: 5432,
  //         //   username: 'postgres',
  //         //   password: '',
  //         //   database: 'masar-test-dbd',
  //         //   autoLoadEntities: true,
  //         //   entities: [entitiesPath],
  //         //   synchronize: true,
  //         //   logging: false,
  //         // }),
  //       ],
  //     }).compile();

  //     app = moduleFixture.createNestApplication();
  //     await app.init();
  //   });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the DataSource
    dataSource = app.get(DataSource);

    // Create a QueryRunner
    queryRunner = dataSource.createQueryRunner();
  });
  //   afterAll(async () => {
  //     await app.close();
  //   });

  afterAll(async () => {
    // Drop the database schema
    await queryRunner.clearDatabase();

    // Release the QueryRunner
    await queryRunner.release();

    console.log('Done Clearing Database');
    await app.close();
  });

  it('Create Customer /Customer', async () => {
    const res = await request(app.getHttpServer()).post('/customer').send({
      name: 'ttt',
    });

    expect(res.status).toBe(201);
  });

  it('Get Customer By Name /Customer/byName/:name', async () => {
    const res = await request(app.getHttpServer()).get('/customer/byName/ttt');

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('ttt');
  });
});
