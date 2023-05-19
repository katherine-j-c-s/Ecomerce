import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  async findAll() {
    return this.users;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async delete(id: string) {
    const user = this.users.filter((user) => user.id === id);
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1); // elimina 1 elemento en la posición encontrada
    }

    return { id };
  }
}
