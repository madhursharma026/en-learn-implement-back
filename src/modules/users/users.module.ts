import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ConversationModule } from '../conversation/conversation.module';
import { TeachingClassModule } from '../teaching-class/teaching-class.module';

@Module({
  imports: [
    forwardRef(() => ConversationModule),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TeachingClassModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
