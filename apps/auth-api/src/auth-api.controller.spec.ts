import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth-api.controller';
import { AuthService } from './auth-api.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            findByEmail: jest.fn(),
            comparePassword: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register()', () => {
    it('should call authService.register and return user', async () => {
      const mockUser = { id: 1, email: 'test@mail.com' };
      const dto = { email: 'test@mail.com', password: '123456' };

      jest.spyOn(authService, 'register').mockResolvedValue(mockUser as any);

      const result = await authController.register(dto);
      expect(result).toEqual(mockUser);
      expect(authService.register).toHaveBeenCalledWith(dto);
    });
  });
});
