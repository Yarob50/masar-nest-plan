import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: 'localhost', // Replace with your Redis host
      port: 6379, // Replace with your Redis port if needed
    });

    this.client.on('error', (err) => console.error('Redis error', err));
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  // Set a key with a value and an expiration time (in seconds)
  async setWithExpiration(
    key: string,
    value: string,
    ttl: number,
  ): Promise<void> {
    await this.client.set(key, value, 'EX', ttl);
  }

  // Check time-to-live (TTL) of a key (returns remaining seconds or -2 if key doesn't exist, -1 if key has no expiration)
  async getTTL(key: string): Promise<number> {
    return await this.client.ttl(key);
  }

  // Delete a key
  async deleteKey(key: string): Promise<void> {
    await this.client.del(key);
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
