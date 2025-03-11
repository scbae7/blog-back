import { Injectable } from '@nestjs/common';
import { SignInRequestDto, SignUpRequestDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';
import { UserRepository } from 'modules/data-access/repository';

import  * as bcrypt from 'bcrypt';
import { UserEntity } from 'modules/data-access/entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor (
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {}

  async signUp(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, password, nickname, telNumber } = dto;

    const isExistEmail = await this.userRepository.existByEmail(email);
    if(isExistEmail) SignUpResponseDto.duplicateEmail();

    const isExistNickname = await this.userRepository.existByNickname(nickname);
    if(isExistNickname) SignUpResponseDto.duplicateNickname();

    const isExistTelNumber = await this.userRepository.existByTelNumber(telNumber);
    if(isExistTelNumber) SignUpResponseDto.duplicateTelNumber();

    const salt = await bcrypt.genSalt();
    const encodedPassword = await bcrypt.hash(password, salt);
    dto.password = encodedPassword;

    const userEntity: UserEntity = { ...dto, profileImage: null };
    await this.userRepository.save(userEntity);

    return SignUpResponseDto.success();
  }

  async signIn(dto: SignInRequestDto): Promise<SignInResponseDto> {
    const {email, password} = dto;

    const userEntity = await this.userRepository.findByEmail(email);
    if(!userEntity) {
      SignInResponseDto.signInFail();
    }

    const encodedPassword = userEntity.password;
    const isMatched = await bcrypt.compare(password, encodedPassword);

    if(!isMatched) {
      SignInResponseDto.signInFail();
    }

    const payload = {sub: email};
    const token = this.jwtService.sign(payload);

    return SignInResponseDto.success(token);
  }
}
