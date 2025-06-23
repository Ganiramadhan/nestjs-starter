import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth-api.service';
import { JwtService } from '@nestjs/jwt';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SsoLoginDto } from './dto/sso-login.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and get access token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login success',
    schema: {
      example: {
        user: {
          id: 1,
          email: 'user@example.com',
          name: 'John Doe',
          createdAt: '2025-06-23T12:34:56.000Z',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.findByEmail(body.email);
    if (!user || !(await this.authService.comparePassword(body.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    const { password, ...userData } = user;

    return {
      user: {
        ...userData,
        access_token: token,
      },
    };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Email already registered',
  })
  async register(@Body() body: RegisterDto) {
    const existingUser = await this.authService.findByEmail(body.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    return this.authService.register(body);
  }

  @Post('login/sso')
  @ApiOperation({ summary: 'Login via SSO and get access token' })
  @ApiBody({ type: SsoLoginDto })
  @ApiResponse({
    status: 200,
    description: 'SSO Login success',
    schema: {
      example: {
        user: {
          id: 2,
          email: 'sso@example.com',
          name: 'Jane SSO',
          createdAt: '2025-06-23T13:00:00.000Z',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid SSO token' })
  async loginSSO(@Body() body: SsoLoginDto) {
    const ssoUser = await this.authService.validateSsoToken(body.provider, body.token);

    if (!ssoUser) {
      throw new UnauthorizedException('Invalid SSO token');
    }

    const payload = { sub: ssoUser.id, email: ssoUser.email };
    const token = await this.jwtService.signAsync(payload);

    const { password, ...userData } = ssoUser;

    return {
      user: {
        ...userData,
        access_token: token,
      },
    };
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (protected)' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    schema: {
      example: [
        {
          id: 1,
          email: 'user@example.com',
          name: 'John Doe',
          createdAt: '2025-06-23T12:34:56.000Z',
        },
      ],
    },
  })
  async getAllUsers() {
    return this.authService.findAll();
  }
}
