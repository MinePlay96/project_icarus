import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/core/modules/user/dto/create-user.dto';
import { TestEvent } from '../events/AEvent';
// import { OnEvent } from '../events/onEvent.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
