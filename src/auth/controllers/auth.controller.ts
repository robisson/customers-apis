import { Controller, Request, Post, UseGuards, Get, Body, Param, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { User } from 'src/users/Entities/user.entity';

@ApiTags("Authentication")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    description: "The only purpouse of this api is to simulate oauth2 grant type resource owner password flow",
    summary: "Generate access_token"
  })
  @Post('oauth2/token')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login({
      username: req.user.email,
      password: req.body.password
    });
  }

  @Post('oauth2/register')
  @ApiOperation({ 
    description: "The only purpouse of this api is to simulate oauth2 dynamic register" ,
    summary: "Create a user to generate access_token and call apis"
  })
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() userDto: UserDto) {
    const result: User | String = await this.authService.registerUser(userDto);

    if (typeof result == "string") {
      throw new HttpException(result, HttpStatus.NOT_ACCEPTABLE);
    }

    return result;
  }
}
