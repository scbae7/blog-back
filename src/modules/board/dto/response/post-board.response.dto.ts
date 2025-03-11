import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { ResponseDto } from "types/classes";
import { ResponseCode, ResponseMessage } from "types/enums";

export default class PostBoardResponseDto extends ResponseDto {

  constructor() {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  static success() {
    return new PostBoardResponseDto();
  }

  static noExistBoard() {
    throw new BadRequestException(new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD));
  }

  static noExistUser() {
    throw new UnauthorizedException(new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER));
  }
}