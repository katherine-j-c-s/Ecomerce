import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    {
      firstName: 'Pablo',
      lastName: 'Maldonado',
      adress: 'San Jose 1010',
      email: 'pablo@gmail.com',
      id: '1',
      profilePhoto: 'asd',
    },
    {
      firstName: 'Agustin',
      lastName: 'Andrada',
      adress: 'San Jose 1020',
      email: 'agustin@gmail.com',
      id: '2',
      profilePhoto: 'asd',
    },
    {
      firstName: 'Horacio',
      lastName: 'Andrada',
      adress: 'San Jose 1030',
      email: 'horacio@gmail.com',
      id: '3',
      profilePhoto: 'asd',
    },
    {
      firstName: 'Bruno',
      lastName: 'Vogth',
      adress: 'San Jose 1010',
      email: 'bruno@gmail.com',
      id: '4',
      profilePhoto: 'asd',
    },
  ];

  async getAll() {
    return this.users;
  }

  async getById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async getByName(firstName: string) {
    const user = this.users.find((user) => user.firstName === firstName);

    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1); // elimina 1 elemento en la posición encontrada
    }

    return { id };
  }
}
