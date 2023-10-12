import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Teacher } from './entities/teacher.entity';
import { TeachersService } from './teachers.service';
import { TeachersResolver } from './teachers.resolver';
import { TeachingClassModule } from '../teaching-class/teaching-class.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    forwardRef(() => TeachingClassModule),
  ],
  providers: [TeachersResolver, TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
