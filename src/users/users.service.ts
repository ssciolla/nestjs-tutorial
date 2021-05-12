import { Injectable } from '@nestjs/common';

import { User } from './users.interfaces';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'sam',
      password: 'me',
    },
    {
      userId: 2,
      username: 'test',
      password: 'you',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
