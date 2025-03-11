// Repository
// 역할: 데이터베이스와의 상호작용을 담당하는 클래스입니다. CRUD 작업을 수행하며, 주로 엔티티에 매핑된 데이터를 쿼리합니다.

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

// 구성 방법: NestJS와 TypeORM을 사용할 경우, @InjectRepository 데코레이터를 통해 특정 엔티티의 리포지토리를 주입받아 사용할 수 있습니다.

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
