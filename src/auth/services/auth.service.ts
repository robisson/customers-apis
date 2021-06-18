import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByAndPassword(username, pass);

    if (user !== null) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const userAuthenticated = await this.validateUser(user.username, user.password);
    if(userAuthenticated == null){
      return {
        access_token: null,
      }  
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public registerUser(userDto: UserDto) {

    const { password, confirmPassword } = userDto;

    if (password !== confirmPassword) {
      throw new HttpException("The password and confirmPassword field are not equals", HttpStatus.NOT_ACCEPTABLE);
    }

    return this.usersService.save(userDto.email, userDto.password);
  }
}
