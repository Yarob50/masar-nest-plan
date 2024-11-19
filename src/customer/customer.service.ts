import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(private readonly dataSource: DataSource) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customerRepo = this.dataSource.getRepository('Customer');
    return customerRepo.save(createCustomerDto);
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    const customerRepo = this.dataSource.getRepository('Customer');
    return customerRepo.findOne({ where: { id } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  getCustomerByName(name: string) {
    const customerRepo = this.dataSource.getRepository('Customer');
    return customerRepo.findOneOrFail({ where: { name } });
  }
}
