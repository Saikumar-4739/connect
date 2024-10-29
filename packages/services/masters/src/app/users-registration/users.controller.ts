import { Controller, Post, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../authentication/secret-files/jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { CreateUser } from '../../../../../libs/shared-models/src';
import { GlobalResponseObject } from '../../../../../libs/backend-utils/src';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({
    description: 'User registration data',
    type: CreateUser, 
  })
  async register(@Body() body: CreateUser): Promise<GlobalResponseObject> {
    return this.usersService.create(body); 
  }

  @UseGuards(JwtAuthGuard)
  @Post(':email')
  async getUser(@Param('email') email: string): Promise<GlobalResponseObject> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Return a GlobalResponseObject for found user
    return GlobalResponseObject.createResponse(true, 200, 'User found.', [user]);
  }
}
 