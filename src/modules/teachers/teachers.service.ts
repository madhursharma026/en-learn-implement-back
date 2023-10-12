import {
  Logger,
  Inject,
  forwardRef,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Not, Repository } from 'typeorm';

import { Teacher } from './entities/teacher.entity';
import { RegisterTeacherInput } from './dto/register-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeachingClassService } from '../teaching-class/teaching-class.service';

@Injectable()
export class TeachersService {
  private logger = new Logger(TeachersService.name);
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    @Inject(forwardRef(() => TeachingClassService))
    private readonly teachingClassService: TeachingClassService,
  ) {}

  async createTeacher(registerTeacherInput: Partial<RegisterTeacherInput>) {
    const { mobileNumber, ...rest } = registerTeacherInput;
    const isTeacherExists = await this.teacherRepo.findOne({
      where: { mobileNumber },
    });

    if (isTeacherExists && !isTeacherExists.verified) {
      throw new ConflictException(
        `mobile number already used but not verified, please verify first!`,
      );
    }

    const teacher = this.teacherRepo.create({ ...rest, mobileNumber });
    return this.teacherRepo.save(teacher);
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(options: FindOneOptions<Teacher>) {
    return this.teacherRepo.findOne(options);
  }

  findOneById(teacherId: number) {
    return this.teacherRepo.findOneBy({ id: teacherId });
  }

  async update(
    findOptions: FindOptionsWhere<Teacher>,
    update: Partial<Teacher>,
  ) {
    return this.teacherRepo.update(findOptions, update);
  }

  async updateTeacher(
    teacherId: number,
    updateTeacherInput: UpdateTeacherInput,
  ) {
    const teacherFromDB = await this.teacherRepo.findOneBy({ id: teacherId });
    if (!teacherFromDB) {
      throw new NotFoundException("User with given id doesn't exists");
    }

    const { mobileNumber = null, ...rest } = updateTeacherInput;

    if (mobileNumber) {
      const isMobileNumberUsed = await this.teacherRepo.findOneBy({
        mobileNumber,
        id: Not(teacherId),
      });

      if (isMobileNumberUsed) {
        throw new ConflictException('Mobile number is already in use.');
      }
    }

    return this.teacherRepo.save({ ...teacherFromDB, ...rest });
  }

  async getTeachingClasses(teacherId: number) {
    return this.teachingClassService.getTeachingClassesOfTeacher(teacherId);
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
