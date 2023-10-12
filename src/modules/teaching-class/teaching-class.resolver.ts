import {
  Int,
  Args,
  Query,
  Parent,
  Resolver,
  Mutation,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserModel } from '../users/model/user.model';
import { TeacherModel } from '../teachers/model/teacher.model';
import { TeachingClassService } from './teaching-class.service';
import { TeachingClassModel } from './model/teaching-class.model';
import { TeacherAuthGuard } from '../auth/guards/teacher-auth.guard';
import { CreateTeachingClassInput } from './dto/create-teaching-class.input';
import { UpdateTeachingClassInput } from './dto/update-teaching-class.input';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';

@Resolver(() => TeachingClassModel)
@UseGuards(TeacherAuthGuard)
export class TeachingClassResolver {
  constructor(private readonly teachingClassService: TeachingClassService) {}

  @UseGuards(JWTAuthGuard)
  @Mutation(() => TeachingClassModel)
  createTeachingClass(
    @Args('createTeachingClassInput')
    createTeachingClassInput: CreateTeachingClassInput,
  ) {
    console.dir(createTeachingClassInput);
    return this.teachingClassService.create(createTeachingClassInput);
  }

  @Query(() => [TeachingClassModel], { name: 'teachingClasses' })
  findAll() {
    return this.teachingClassService.findAll({ loadRelationIds: true });
  }

  @Query(() => TeachingClassModel, { name: 'teachingClass' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teachingClassService.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  @Mutation(() => TeachingClassModel)
  updateTeachingClass(
    @Args('updateTeachingClassInput')
    updateTeachingClassInput: UpdateTeachingClassInput,
  ) {
    return this.teachingClassService.update(
      { id: updateTeachingClassInput.id },
      updateTeachingClassInput,
    );
  }

  @UseGuards(JWTAuthGuard)
  @Mutation(() => TeachingClassModel)
  joinTeachingClass(
    @Args('teachingClassId') teachingClassId: number,
    @User() user: ICurrentUser,
  ) {
    return this.teachingClassService.joinClass(user.id, teachingClassId);
  }

  @Mutation(() => TeachingClassModel)
  removeTeachingClass(@Args('id', { type: () => Int }) id: number) {
    return this.teachingClassService.remove(id);
  }

  @ResolveField('teacher', () => TeacherModel)
  getTeacherOfClass(@Parent() parent: TeachingClassModel) {
    return this.teachingClassService.getTeacherOfClass(parent.teacherId);
  }

  @ResolveField('usersJoined', () => [UserModel])
  getUsersOfClass(@Parent() parent: TeachingClassModel) {
    return this.teachingClassService.getUsersOfClass(parent.id);
  }
}
