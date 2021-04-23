import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Pagination } from '../../core/types';
import { ErrorService } from '../../module/error/error.service';
import { UserEntity } from './user.entity';
import { User } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private errorService: ErrorService
  ) {}

  async findAll(): Promise<Pagination<UserEntity>> {
    const [list, total] = await this.userRepository.findAndCount({
      skip: 0,
      take: 5,
    });
    return { list, total };
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const result = await this.userRepository.delete(id);
    if (result.affected) {
      return { message: '지워짐' };
    } else {
      return { message: '존재하지 않음' };
    }
  }

  async create(user: User): Promise<User> {
    await this.connection
      .transaction(async (manager) => {
        const { userId, userName } = user;
        if (!userId) this.errorService.badRequest({ message: 'require params "userId"' });
        if (!userName) this.errorService.badRequest({ message: 'require params "userName"' });
        const result = await manager.insert(UserEntity, {
          userId,
          userName,
        });
        const resultUser = result.generatedMaps[0];
        user.id = resultUser.id;
      })
      .catch((err) => {
        this.errorService.badRequest({ message: err.message });
      });
    return user;
  }
}
