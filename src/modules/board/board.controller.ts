import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import JwtAuthGuard from 'guard/jwt-auth.guard';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import { GetSignInUser } from 'decorator';
import { DeleteBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto, IncreaseViewCountResponseDto, PatchBoardResponseDto, PostBoardResponseDto, PostCommentResponseDto, PutFavoriteResponseDto, GetBoardResponseDto, GetLatestListResponseDto, GetTop3ListResponseDto, GetSearchListResponseDto, GetUserBoardListResponseDto } from './dto/response';

@Controller('/api/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  postBoard(
    @Body() requestBody: PostBoardRequestDto,
    @GetSignInUser() email: string
  ): Promise<PostBoardResponseDto> {
    const response = this.boardService.postBoard(requestBody, email);
    return response;
  }

  @Post('/:boardNumber/comment')
  @UseGuards(JwtAuthGuard)
  postComment(
    @Body() requestBody: PostCommentRequestDto,
    @Param('boardNumber') boardNumber: number,
    @GetSignInUser() email: string
  ): Promise<PostCommentResponseDto> {
    const response = this.boardService.postComment(requestBody, boardNumber, email);
    return response;
  }

  @Get('/latest-list')
  getLatestList(): Promise<GetLatestListResponseDto> {
    const response = this.boardService.getLatestList();
    return response;
  }

  @Get('/top-3')
  getTop3List(): Promise<GetTop3ListResponseDto> {
    const response = this.boardService.getTop3List();
    return response;
  }

  @Get(['/search-list/:searchWord', '/search-list/:searchWord/:preSearchWord'])
  getSearchList(
    @Param('searchWord') searchWord: string,
    @Param('preSearchWord') preSearchWord: string
  ): Promise<GetSearchListResponseDto> {
    const response = this.boardService.getSearchList(searchWord, preSearchWord);
    return response;
  }

  @Get('/user-board-list/:email')
  getUserList(
    @Param('email') email: string
  ): Promise<GetUserBoardListResponseDto> {
    const response = this.boardService.getUserBoardList(email);
    return response;
  }

  @Get('/:boardNumber')
  getBoard(
    @Param('boardNumber') boardNumber: number
  ): Promise<GetBoardResponseDto> {
    const response = this.boardService.getBoard(boardNumber);
    return response;
  }

  @Get('/:boardNumber/increase-view-count')
  increaseViewCount(
    @Param('boardNumber') boardNumber: number
  ): Promise<IncreaseViewCountResponseDto> {
    const response = this.boardService.increaseViewCount(boardNumber);
    return response;
  }

  @Get('/:boardNumber/comment-list')
  getCommentList(
    @Param('boardNumber') boardNumber: number
  ):Promise<GetCommentListResponseDto> {
    const response = this.boardService.getCommentList(boardNumber);
    return response;
  }

  @Get('/:boardNumber/favorite-list')
  getFavoriteList(
    @Param('boardNumber') boardNumber: number
  ):Promise<GetFavoriteListResponseDto> {
    const response = this.boardService.getFavoriteList(boardNumber);
    return response;
  }

  @Patch('/:boardNumber')
  @UseGuards(JwtAuthGuard)
  patchBoard(
    @Body() requestBody: PatchBoardRequestDto,
    @Param('boardNumber') boardNumber: number,
    @GetSignInUser() email: string
  ): Promise<PatchBoardResponseDto> {
    const response =  this.boardService.patchBoard(requestBody, boardNumber, email);
    return response;
  }

  @Put('/:boardNumber/favorite')
  @UseGuards(JwtAuthGuard)
  putFavorite(
    @Param('boardNumber') boardNumber: number,
    @GetSignInUser() email: string
  ): Promise<PutFavoriteResponseDto> {
    const response = this.boardService.putFavorite(boardNumber, email);
    return response;
  }

  @Delete('/:boardNumber')
  @UseGuards(JwtAuthGuard)
  deleteBoard(
    @Param('boardNumber') boardNumber: number,
    @GetSignInUser() email: string
  ): Promise<DeleteBoardResponseDto> {
    const response = this.boardService.deleteBoard(boardNumber, email);
    return response;
  }
}
