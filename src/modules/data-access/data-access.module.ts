import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity, BoardListViewEntity, CommentEntity, FavoriteEntity, ImageEntity, SearchLogEntity, UserEntity } from './entities';
import { BoardListViewRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, UserRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity, BoardEntity, CommentEntity, FavoriteEntity, ImageEntity, SearchLogEntity, BoardListViewEntity
  ])],
  providers: [UserRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, BoardListViewRepository],
  exports: [UserRepository, BoardRepository, CommentRepository, FavoriteRepository, ImageRepository, SearchLogRepository, BoardListViewRepository],
})
export class DataAccessModule {}
