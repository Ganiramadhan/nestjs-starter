import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({ ...data, password: hashed });
    const saved = await this.userRepo.save(user);
    const { password, ...userWithoutPassword } = saved;
    return userWithoutPassword;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepo.find();
    return users.map(({ password, ...user }) => user);
  }

  async createUser(data: { email: string; name: string; password?: string }) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async validateSsoToken(provider: string, token: string): Promise<User | null> {
    let ssoUserData: { email: string; name: string } | null = null;

    if (provider === 'google') {
      ssoUserData = await this.validateGoogleToken(token);
    }

    if (!ssoUserData) return null;

    let user = await this.findByEmail(ssoUserData.email);
    if (!user) {
      user = await this.createUser({
        email: ssoUserData.email,
        name: ssoUserData.name,
        password: '', // Kosong karena SSO
      });
    }

    return user;
  }

  async validateGoogleToken(token: string): Promise<{ email: string; name: string } | null> {
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      return {
        email: payload.email,
        name: payload.name,
      };
    } catch (error) {
      console.error('SSO Google token error:', error);
      return null;
    }
  }
}
