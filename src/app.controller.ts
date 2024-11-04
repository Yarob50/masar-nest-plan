import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from './user/entities/user.entity';
import { Customer } from './user/entities/customer.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/findUserByName/:name')
  async findUserByName(@Param('name') name: string) {
    const usersRepo = this.dataSource.getRepository('Users');
    return await usersRepo.findOne({ where: { name } });
  }

  @Get('/findUserById/:id')
  async findUserById(@Param('id') id: number) {
    const usersRepo = this.dataSource.getRepository('Users');
    return await usersRepo.findOne({ where: { id } });
  }

  @Get('/findUserByEmail/:email')
  async findUserByEmail(@Param('email') email: string) {
    const usersRepo = this.dataSource.getRepository('Users');
    return await usersRepo.findOne({ where: { email } });
  }

  @Post('/fillUsers')
  async fillUsers() {
    const usersRepo: Repository<User> = this.dataSource.getRepository(User);

    // Choose a suitable chunk size
    const chunkSize = 30000;
    const totalUsers = 10000000;
    const users = [];

    for (let i = 0; i < totalUsers; i++) {
      const randomName = faker.internet.userName();
      const randomEmail = faker.internet.email();

      users.push({
        name: randomName,
        email: randomEmail,
      });

      // Insert in chunks
      if (users.length === chunkSize) {
        console.log('Inserting chunk Number:', i / chunkSize);
        console.log('Percentage done:', (i / totalUsers) * 100 + '%');
        await usersRepo.insert(users);
        users.length = 0; // clear the array
      }
    }

    // Insert any remaining users
    if (users.length > 0) {
      await usersRepo.insert(users);
    }

    return 'done';
  }

  @Post('/fillCustomers')
  async fillCustomers() {
    const customersRepo: Repository<Customer> =
      this.dataSource.getRepository(Customer);

    // Choose a suitable chunk size
    const chunkSize = 10_000;
    const totalUsers = 1_000_000;
    const users = [];

    for (let i = 0; i < totalUsers; i++) {
      const randomName = faker.internet.userName();
      const randomEmail = faker.internet.email();
      const randomCity = faker.location.city();

      users.push({
        name: randomName,
        email: randomEmail,
        city: randomCity,
      });

      // Insert in chunks
      if (users.length === chunkSize) {
        console.log('Inserting chunk Number:', i / chunkSize);
        console.log('Percentage done:', (i / totalUsers) * 100 + '%');
        await customersRepo.insert(users);
        users.length = 0; // clear the array
      }
    }

    // Insert any remaining users
    if (users.length > 0) {
      await customersRepo.insert(users);
    }

    return 'done';
  }
}
