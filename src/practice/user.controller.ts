// Pipeline (파이프라인)
// 역할: 요청 데이터를 가공하거나 유효성 검증을 수행하는 미들웨어와 비슷한 역할을 합니다.

import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./create-user.dto";

// 구성 방법: @UsePipes 데코레이터를 통해 파이프를 적용할 수 있습니다. 주로 ValidationPipe를 사용하여 DTO의 유효성 검증을 수행합니다.

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService;
  }
}
// Promise<User[]> 타입은 이 메서드가 User 객체 배열을 비동기로 반환할 것임을 의미합니다. Promise<User[]>는 비동기 작업이 끝나면 User 타입 객체들의 배열 (User[])을 반환한다는 뜻입니다.

// findAll 메서드 : findAll(): Promise<User[]>는 this.userRepository.find(()를 호출합니다. 이 호출은 데이터베이스에서 모든 User 엔티티의 데이터를 비동기로 조회하고, User 객체 배열을 포함한 Promise를 반환합니다.

// Promise<User>[]의 의미:
// Promise: 비동기 작업이 완료되었을 때의 결과를 나타내는 객체입니다.
// User[]: 비동기 작업이 완료되면 User 객체들이 배열로 반환됨을 뜻합니다.
// Promise<User[]>: 비동기 작업이 완료되면 User객체 배열(User[])이 반환된다는 타입 표시입니다.
// 이 구조 덕분에 findAll을 호출하는 쪽에서는 await 또는 .then()을 사용하여 비동기 작업의 결과(User[])를 받을 수 있습니다.