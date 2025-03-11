import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import JwtAuthGuard from '../../guard/jwt-auth.guard';
import { SignInRequestDto, SignUpRequestDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post('/sign-up')
 signUp(@Body() requestBody: SignUpRequestDto): Promise<SignUpResponseDto> {
  console.log(requestBody);
  const response = this.authService.signUp(requestBody);
  return response;
 }

 @Post('/sign-in')
 singIn(@Body() requestBody: SignInRequestDto): Promise<SignInResponseDto> {
  console.log(requestBody);
  console.log('로그인 요청')
  const response = this.authService.signIn(requestBody);
  return response;
 }
}
