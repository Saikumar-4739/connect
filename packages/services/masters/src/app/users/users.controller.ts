import { Controller, Post, Body, Get, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({
    description: 'User registration data',
    type: User, // Specify the type of the request body
  })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async register(@Body() body: { email: string; password: string }): Promise<User> {
    const { email, password } = body;
    return this.usersService.create(email, password);
  }

  @UseGuards(JwtAuthGuard) 
  @Get(':email')
  async getUser(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found'); 
    }
    return user; 
  }
}
