import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
} from 'typeorm';
import {
  Inject,
  Logger,
  Injectable,
  forwardRef,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from '../users/users.service';
import { TeachersService } from '../teachers/teachers.service';
import { TeachingClass } from './entities/teaching-class.entity';
import { CreateTeachingClassInput } from './dto/create-teaching-class.input';

@Injectable()
export class TeachingClassService {
  private readonly logger = new Logger(TeachingClassService.name);
  constructor(
    @InjectRepository(TeachingClass)
    private readonly teachingClassRepo: Repository<TeachingClass>,
    @Inject(forwardRef(() => TeachersService))
    private readonly teacherService: TeachersService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  async create(createTeachingClassInput: CreateTeachingClassInput) {
    try {
      const teachingClassExist = await this.findOne({
        where: { title: createTeachingClassInput.title },
      });
      if (teachingClassExist)
        throw new ConflictException(`Class already exist with same title!`);
      return await this.teachingClassRepo
        .create(createTeachingClassInput)
        .save();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(findManyOptions: FindManyOptions) {
    return this.teachingClassRepo.find(findManyOptions);
  }

  async findOne(options: FindOneOptions<TeachingClass>) {
    return this.teachingClassRepo.findOne(options);
  }

  async update(
    findOptions: FindOptionsWhere<TeachingClass>,
    update: Partial<TeachingClass>,
  ) {
    return this.teachingClassRepo.update(findOptions, update);
  }

  async getTeachingClassesOfTeacher(teacherId: number) {
    return this.teachingClassRepo.findBy({ teacherId });
  }

  getTeacherOfClass(teacherId: number) {
    return this.teacherService.findOneById(teacherId);
  }

  async getUsersOfClass(teachingClassId: number) {
    const teachingClass = await this.teachingClassRepo.findOne({
      where: { id: teachingClassId },
      loadRelationIds: true,
    });
    const users = teachingClass.usersJoined as unknown as number[];

    return this.userService.findAllByIds(users);
  }

  async getTeachingClassesOfUser(userId: number) {
    const teachingClasses = await this.teachingClassRepo.find({
      loadRelationIds: true,
    });

    const classesJoinedByUser = teachingClasses.filter((teachingClass) =>
      (teachingClass.usersJoined as unknown as number[]).includes(userId),
    );

    return classesJoinedByUser;
  }

  async joinClass(userId: number, teachingClassId: number) {
    const user = await this.userService.findOneById(userId);

    const teachingClass = await this.teachingClassRepo.findOne({
      where: { id: teachingClassId },
      relations: {
        usersJoined: true,
      },
    });

    if (!teachingClass) {
      throw new NotFoundException('No such teaching class exists!');
    }

    if (
      teachingClass.usersJoined.find((classUser) => classUser.id === userId)
    ) {
      throw new ConflictException('You are already enrolled in this class.');
    }

    teachingClass.usersJoined.push(user);
    return teachingClass.save();
  }

  remove(id: number) {
    return `This action removes a #${id} teachingClass`;
  }
}
