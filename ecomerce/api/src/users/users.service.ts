import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/User.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async createUser(user: User): Promise<User> {
    console.log(
      '🚀 ~ file: users.service.ts:18 ~ UsersService ~ createBook ~ user:',
      user
    );
    return this.userModel.create<User>({
      Name: user.Name,
      LastName: user.LastName,
      Email: user.Email,
      Password: user.Password,
      Address: user.Address,
      ImgUrl: user.ImgUrl
    });
  }
}
