import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.services';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { LoginResponseDto } from './login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    description: 'User login credentials',
    type: LoginDto, // Use the LoginDto for request
  })
  @ApiResponse({ status: 200, description: 'Successfully logged in.', type: LoginResponseDto }) // Use the response DTO
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); 
    }

    return this.authService.login(user); 
  }
}
