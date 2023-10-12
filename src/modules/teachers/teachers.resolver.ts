import {
  Int,
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { TeachersService } from './teachers.service';
import { TeacherModel } from './model/teacher.model';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';
import { TeachingClassModel } from '../teaching-class/model/teaching-class.model';

@Resolver(() => TeacherModel)
export class TeachersResolver {
  constructor(private readonly teachersService: TeachersService) {}

  @UseGuards(JWTAuthGuard)
  @Query(() => [TeacherModel], { name: 'teachers' })
  findAll() {
    return this.teachersService.findAll();
  }

  @UseGuards(JWTAuthGuard)
  @Query(() => TeacherModel, { name: 'teacher' })
  findOne(@Args('id', { type: () => Int }) teacherId: number) {
    return this.teachersService.findOneById(teacherId);
  }

  @UseGuards(JWTAuthGuard)
  @Mutation(() => TeacherModel)
  updateTeacher(
    @User() currentTeacher: ICurrentUser,
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
  ) {
    return this.teachersService.updateTeacher(
      currentTeacher.id,
      updateTeacherInput,
    );
  }

  @ResolveField('teachingClasses', () => [TeachingClassModel])
  teachingClassesOfTeacher(@Parent() parent: TeacherModel) {
    return this.teachersService.getTeachingClasses(parent.id);
  }
}
