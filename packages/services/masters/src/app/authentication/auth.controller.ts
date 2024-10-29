import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.services';
import { ApiBody } from '@nestjs/swagger';
import { GlobalResponseObject, ValidateUserReq } from '../../../../../libs/shared-models/src';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiBody({ type: ValidateUserReq }) 
    @Post('/login')
    async login(@Body() req: ValidateUserReq): Promise<GlobalResponseObject> {
        try {
            const user = await this.authService.validateUser(req);
            if (!user) {
                throw new UnauthorizedException('Invalid credentials'); 
            }
            return new GlobalResponseObject(true, 200, 'Login successful.');
        } catch (error) {
            return new GlobalResponseObject(false, 401, 'Invalid credentials');
        }
    }

    @Post('/logout')
    async logout(@Body() body: { token: string }): Promise<GlobalResponseObject> {
        await this.authService.logout(body.token);
        return new GlobalResponseObject(true, 200, 'Successfully logged out.');
    }
}
