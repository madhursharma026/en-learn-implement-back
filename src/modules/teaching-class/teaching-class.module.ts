import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeachersModule } from '../teachers/teachers.module';
import { TeachingClassService } from './teaching-class.service';
import { TeachingClass } from './entities/teaching-class.entity';
import { TeachingClassResolver } from './teaching-class.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => TeachersModule),
    TypeOrmModule.forFeature([TeachingClass]),
  ],
  providers: [TeachingClassResolver, TeachingClassService, JwtService],
  exports: [TeachingClassService],
})
export class TeachingClassModule {}
