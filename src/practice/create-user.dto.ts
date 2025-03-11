// DTO (Data Transfer Object)
// 역할: 계층 간 데이터를 주고 받을 때 사용하는 객체로, 주로 클라이언트와 서버간의 데이터 구조를 정의합니다.
// 구성 방법: 클래스 형태로 정의하며, 원하는 속성과 데이터 타입을 지정합니다. 유효성 검증을 위해 class-validator 라이브러리를 사용하여 @IsString, @IsEmail 등의 데코레이터 검증 규칙을 설정할 수 있습니다.

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}