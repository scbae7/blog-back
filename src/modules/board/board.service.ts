import { Injectable } from '@nestjs/common';
import { BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository } from 'modules/data-access/repository';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import { PostBoardResponseDto, GetBoardResponseDto, PatchBoardResponseDto, PostCommentResponseDto, GetCommentListResponseDto, PutFavoriteResponseDto, GetFavoriteListResponseDto, DeleteBoardResponseDto, IncreaseViewCountResponseDto, GetLatestListResponseDto, GetTop3ListResponseDto, GetSearchListResponseDto, GetUserBoardListResponseDto } from './dto/response';

@Injectable()
export class BoardService {
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
    private readonly imageRepository: ImageRepository,
    private readonly commentRepository: CommentRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly boardListViewRepository: BoardListViewRepository,
    private readonly searchLogRepository: SearchLogRepository
  ) {}

  async postBoard(dto: PostBoardRequestDto, email: string): Promise<PostBoardResponseDto> {

    const isExistUser = await this.userRepository.existByEmail(email);
    if(!isExistUser) PostBoardResponseDto.noExistUser();

    const boardEntity = this.boardRepository.create(dto, email);
    await this.boardRepository.save(boardEntity);

    const { boardImageList } = dto;
    const { boardNumber } = boardEntity;
    const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
    await this.imageRepository.saveAll(imageEntities);

    return PostBoardResponseDto.success();
  }

  async postComment(dto: PostCommentRequestDto, boardNumber: number, email: string):Promise<PostCommentResponseDto> {

    const isExistUser = await this.userRepository.existByEmail(email);
    if(!isExistUser) PostCommentResponseDto.noExistUser();

    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
    if(!boardEntity) PostCommentResponseDto.noExistBoard();

    const commentEntity = this.commentRepository.create(dto, boardNumber, email);
    await this.commentRepository.save(commentEntity);

    boardEntity.commentCount++;
    await this.boardRepository.save(boardEntity);
    
    return PostBoardResponseDto.success();
  }

  async getLatestList(): Promise<GetLatestListResponseDto> {

    const boardListViewEntities = await this.boardListViewRepository.getLatestList();
   
    return GetLatestListResponseDto.success(boardListViewEntities);
  }

  async getTop3List(): Promise<GetTop3ListResponseDto> {

    const boardListViewEntities = await this.boardListViewRepository.getTop3List();
   
    return GetTop3ListResponseDto.success(boardListViewEntities);
  }

  async getSearchList(searchWord: string, preSearchWord: string | undefined): Promise<GetSearchListResponseDto> {

    const boardListViewEntities =  await this.boardListViewRepository.getSearchList(searchWord);

    preSearchWord = preSearchWord ? preSearchWord : null;
    let searchLogEntity = this.searchLogRepository.create(searchWord, preSearchWord, false);
    await this.searchLogRepository.save(searchLogEntity);
    
    const relation = preSearchWord ? true : false;
    if(relation) {
      searchLogEntity = this.searchLogRepository.create(preSearchWord, searchWord, true);
      await this.searchLogRepository.save(searchLogEntity);
    }

    return GetSearchListResponseDto.success(boardListViewEntities);
  }

  async getUserBoardList(email: string): Promise<GetUserBoardListResponseDto> {

    const isExistUser = await this.userRepository.existByEmail(email);
    if(!isExistUser) GetUserBoardListResponseDto.noExistUser();

    const boardListViewEntities = await this.boardListViewRepository.getUserBoardList(email);
    return GetUserBoardListResponseDto.success(boardListViewEntities);
  }

  async getBoard(boardNumber: number): Promise<GetBoardResponseDto> {

    const resultSet = await this.boardRepository.getBoard(boardNumber);
    if(!resultSet) GetBoardResponseDto.noExistBoard();

    const imageEntities = await this.imageRepository.findByBoardNumber(boardNumber);

    return GetBoardResponseDto.success(resultSet, imageEntities);
  }

  async increaseViewCount(boardNumber: number): Promise<IncreaseViewCountResponseDto> {
    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
    if(!boardEntity) IncreaseViewCountResponseDto.noExistBoard();

    boardEntity.viewCount++;
    await this.boardRepository.save(boardEntity);

    return IncreaseViewCountResponseDto.success();
  }

  async getCommentList(boardNumber: number):Promise<GetCommentListResponseDto> {
    
    const isExistBoard = await this.boardRepository.existByBoardNumber(boardNumber);
    if(!isExistBoard) GetCommentListResponseDto.noExistBoard();

    const resultSets = await this.commentRepository.getCommentList(boardNumber);

    return GetCommentListResponseDto.success(resultSets);
  }

  async getFavoriteList(boardNumber: number): Promise<GetFavoriteListResponseDto> {
    const isExistBoard = await this.boardRepository.existByBoardNumber(boardNumber);
    if(!isExistBoard) GetFavoriteListResponseDto.noExistBoard();

    const resultSets = await this.favoriteRepository.getFavoriteList(boardNumber);

    return GetFavoriteListResponseDto.success(resultSets);
  }

  async patchBoard(dto:PatchBoardRequestDto, boardNumber:number, email: string): Promise<PatchBoardResponseDto> {

    const isExistUser = await this.userRepository.existByEmail(email);
    if(!isExistUser) PatchBoardResponseDto.noExistUser();

    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
    if(!boardEntity) PatchBoardResponseDto.noExistBoard();

    const { writerEmail } = boardEntity;
    const isWriter = writerEmail === email;
    if(!isWriter) PatchBoardResponseDto.noPermission();

    boardEntity.title = dto.title;
    boardEntity.content = dto.content;
    await this.boardRepository.save(boardEntity);

    await this.imageRepository.deleteByBoardNumber(boardNumber);

    const { boardImageList } = dto;
    const imageEntities = this.imageRepository.createAll(boardImageList, boardNumber);
    await this.imageRepository.saveAll(imageEntities);

    return PatchBoardResponseDto.success();
  }

  async putFavorite(boardNumber: number, email: string): Promise<PutFavoriteResponseDto> {

    const isExistUser = await this.userRepository.existByEmail(email);
    if(!isExistUser) PutFavoriteResponseDto.noExistUser();

    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);
    if(!boardEntity) PutFavoriteResponseDto.noExistBoard();

    const isExistFavorite = await this.favoriteRepository.existsByBoardNumberAndUserEmail(boardNumber, email);
    if(isExistFavorite) {
      await this.favoriteRepository.deleteByBoardNumberAndUserEmail(boardNumber, email);
      boardEntity.favoriteCount--;
    } else {
      const favoriteEntity = this.favoriteRepository.create(boardNumber, email);
      await this.favoriteRepository.save(favoriteEntity);
      boardEntity.favoriteCount++;
    }

    await this.boardRepository.save(boardEntity);
    
    return PutFavoriteResponseDto.success();
  }

  async deleteBoard(boardNumber: number, email: string): Promise<DeleteBoardResponseDto> {

    const noExistUser = await this.userRepository.existByEmail(email);
    if(!noExistUser) DeleteBoardResponseDto.noExistUser();

    const boardEntity =  await this.boardRepository.findByBoardNumber(boardNumber);
    if(!boardEntity) DeleteBoardResponseDto.noExistBoard();
    
    const isWriter = boardEntity.writerEmail === email;
    if(!isWriter) DeleteBoardResponseDto.noPermission();

    await this.imageRepository.deleteByBoardNumber(boardNumber);
    await this.favoriteRepository.deleteByBoardNumber(boardNumber);
    await this.commentRepository.deleteByBoardNumber(boardNumber);
    await this.boardRepository.deleteByBoardNumber(boardNumber);

    return DeleteBoardResponseDto.success();
  }
}
