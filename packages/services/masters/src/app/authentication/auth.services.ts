import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users-registration/users.service';
import { GlobalResponseObject, ValidateUserReq } from '../../../../../libs/shared-models/src';

@Injectable()
export class AuthService {
  private blacklistedTokens: Set<string> = new Set(); // Using Set for better performance.

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(req: ValidateUserReq): Promise<any> {
    const { email, password } = req; 
    const user = await this.usersService.findOne(email);
    
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user; 
      return result; 
    }
    return null; 
  }

  async login(req: ValidateUserReq): Promise<GlobalResponseObject> {
    const user = await this.validateUser(req);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); 
    }
    return new GlobalResponseObject(true, 200, 'Login successful.');
  }

  async logout(token: string): Promise<void> {
    if (!this.isTokenBlacklisted(token)) {
      this.blacklistedTokens.add(token); 
    }
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token); 
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return !this.isTokenBlacklisted(token); 
    } catch (e) {
      return false; // Invalid token
    }
  }
}
