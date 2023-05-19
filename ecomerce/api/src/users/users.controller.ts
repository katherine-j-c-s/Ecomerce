import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res
} from '@nestjs/common';
import { User } from 'src/models/User.model';
import { UsersService } from './users.service';
import { Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Res() response: Response, @Body() user: User) {
    console.log(
      '🚀 ~ file: users.controller.ts:19 ~ UsersController ~ createUser ~ user:',
      user
    );
    const userCreate = await this.userService.createUser(user);
    return response.status(HttpStatus.CREATED).json(userCreate);
  }

  @Get()
  async fetchAll(@Res() response: Response) {
    console.log('"aquiii"');
    const books = await this.userService.findAll();
    return response.status(HttpStatus.OK).json({ books });
  }

  @Get('/:id')
  async findById(@Res() response: Response, @Param('id') id) {
    console.log('aquiiiii');
    const book = await this.userService.findOne(id);
    return response.status(HttpStatus.OK).json({ book });
  }
}
