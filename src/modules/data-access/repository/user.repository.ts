import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities";
import { DataSource, Repository } from "typeorm";
import { ResponseDto } from "types/classes";

@Injectable()
export default class UserRepository {

  private readonly logger = new Logger('User Repository');

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly dataSource: DataSource
  ) {}

  async existByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.repository.exists({ where: { email }});
      return result;
    } catch (exception) {
      this.logger.error(exception.message)
      ResponseDto.databaseError();
    }
  }

  async existByNickname(nickname: string): Promise<boolean> {
    try {
      const result = await this.repository.exists({ where: { nickname }});
      return result;
    } catch (exception) {
      this.logger.error(exception.message)
      ResponseDto.databaseError();
    }
  }

  async existByTelNumber(telNumber: string): Promise<boolean> {
    try {
      const result = await this.repository.exists({ where: { telNumber }});
      return result;
    } catch (exception) {
      this.logger.error(exception.message)
      ResponseDto.databaseError();
    }
  }

  async findByEmail(email: string):Promise<UserEntity> {
    try {
      const userEntity = await this.repository.findOne({ where: {email} });
      return userEntity;
    } catch (exception) {
      this.logger.error(exception.message)
      ResponseDto.databaseError();
    }
  }

  async save(userEntity: UserEntity): Promise<UserEntity> {
    try {
      return await this.repository.save(userEntity);
    } catch (exception) {
      this.logger.error(exception.message)
      ResponseDto.databaseError();
    }
  }
  
}