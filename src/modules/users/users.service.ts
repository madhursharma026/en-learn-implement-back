import {
  In,
  Not,
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
} from 'typeorm';
import {
  Inject,
  Logger,
  forwardRef,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ConversationService } from '../conversation/conversation.service';
import { TeachingClassService } from '../teaching-class/teaching-class.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(forwardRef(() => ConversationService))
    private readonly conversationService: ConversationService,
    @Inject(forwardRef(() => TeachingClassService))
    private readonly teachingClassService: TeachingClassService,
  ) {}

  async createUser(
    registerUserInput: Partial<RegisterUserInput>,
  ): Promise<User> {
    const { mobileNumber, ...rest } = registerUserInput;
    const isUserExists = await this.userRepo.findOne({
      where: { mobileNumber: mobileNumber },
    });

    if (isUserExists && !isUserExists.verified) {
      throw new ConflictException(
        `mobile number already used but not verified, please verify first!`,
      );
    }

    const user = this.userRepo.create({ ...rest, mobileNumber });
    return this.userRepo.save(user);
  }

  async updateUser(userId: number, updateUserInput: UpdateUserInput) {
    const userFromDB = await this.userRepo.findOneBy({ id: userId });
    if (!userFromDB) {
      throw new NotFoundException("User with given id doesn't exists");
    }

    const { mobileNumber = null, ...rest } = updateUserInput;

    if (mobileNumber) {
      const isMobileNumberUsed = await this.userRepo.findOneBy({
        mobileNumber,
        id: Not(userId),
      });

      if (isMobileNumberUsed) {
        throw new ConflictException('Mobile number is already in use.');
      }
    }

    return this.userRepo.save({ ...userFromDB, ...rest });
  }

  findAll(findManyOptions: FindManyOptions) {
    return this.userRepo.find(findManyOptions);
  }

  findAllByIds(userIds: number[]) {
    return this.userRepo.find({ where: { id: In(userIds) } });
  }

  async findOneById(userId: number) {
    if (!userId) return null;
    return this.userRepo.findOneBy({ id: userId });
  }

  async findOne(options: FindOneOptions<User>) {
    return this.userRepo.findOne(options);
  }

  async update(findOptions: FindOptionsWhere<User>, update: Partial<User>) {
    return this.userRepo.update(findOptions, update);
  }

  async getConversationStartedByUser(userId: number) {
    return this.conversationService.getConversationStartedByUser(userId);
  }

  async getConversationJoinedByUser(userId: number) {
    return this.conversationService.getConversationJoinedByUser(userId);
  }

  async getTeachingClassesOfUser(userId: number) {
    return this.teachingClassService.getTeachingClassesOfUser(userId);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
