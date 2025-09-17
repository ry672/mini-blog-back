import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Успешная регистрация' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, description: 'Успешный вход' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Обновление токенов' })
  async refresh(@Body() dto: RefreshDto) {
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.decode(dto.refresh_token) as { sub?: number } | null;

    if (!decoded?.sub) {
      throw new UnauthorizedException('Неверный токен');
    }

    return this.authService.refresh(decoded.sub, dto.refresh_token);
  }

  @Post('/logout')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  logout(@CurrentUser() user: { id: number }) {
    return this.authService.logout(user.id);
  }
}





