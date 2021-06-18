import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../users/services/user.service';
import { UserDto } from '../dto/user.dto';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const access_token = {
    access_token: 'hashtoken',
  };

  const userTologin: UserDto = {
    email: "robisson@robissonoliveira.com.br",
    password: "12345",
    confirmPassword: "12345"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: () => access_token.access_token
          }
        },
        {
          provide: UserService,
          useValue: {
            findUserByAndPassword: () => true,
            save: () => userTologin
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Login should to return a sign access_token', async () => {
    const userTologin = {
      username: "robisson@robissonoliveira.com.br",
      password: "12345"
    };

    let user = await service.login(userTologin);

    expect(user).toMatchObject(access_token);
  });

  it('Register a user should to return a user', async () => {

    let user = await service.registerUser(userTologin);

    expect(user).toMatchObject(userTologin);
  });
});
