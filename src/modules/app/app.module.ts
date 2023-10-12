import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OtpModule } from '../otp/otp.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { TeachersModule } from '../teachers/teachers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Teacher } from '../teachers/entities/teacher.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConversationModule } from '../conversation/conversation.module';
import { Conversation } from '../conversation/entities/conversation.entity';
import { TeachingClassModule } from '../teaching-class/teaching-class.module';
import { TeachingClass } from '../teaching-class/entities/teaching-class.entity';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RoomEntity } from '../room/entities/room.entity';
import { RoomModule } from '../room/room.module';
import { QuestionEntity } from '../questions/entities/question.entity';
import { QuestionModule } from '../questions/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // host: configService.getOrThrow('DB_HOST'),
        // port: +configService.getOrThrow('DB_PORT'),
        // username: configService.getOrThrow('DB_USER'),
        // password: configService.getOrThrow('DB_PASSWORD'),
        // database: configService.getOrThrow('DB_NAME'),
        // synchronize: process.env.NODE_ENV === 'development',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'en-db',
        entities: [Conversation, Teacher, TeachingClass, User, RoomEntity, QuestionEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    OtpModule,
    AuthModule,
    UsersModule,
    TeachersModule,
    ConversationModule,
    TeachingClassModule,
    RoomModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// import { Module } from '@nestjs/common';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { GraphQLModule } from '@nestjs/graphql';
// import { join } from 'path';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AppService } from './app.service';
// import { OtpModule } from '../otp/otp.module';
// import { AuthModule } from '../auth/auth.module';
// import { UsersModule } from '../users/users.module';
// import { TeachersModule } from '../teachers/teachers.module';
// import { ConversationModule } from '../conversation/conversation.module';
// import { TeachingClassModule } from '../teaching-class/teaching-class.module';
// import { Conversation } from '../conversation/entities/conversation.entity';
// import { Teacher } from '../teachers/entities/teacher.entity';
// import { TeachingClass } from '../teaching-class/entities/teaching-class.entity';
// import { User } from '../users/entities/user.entity';
// import { AppController } from './app.controller';
// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       playground: false,
//       autoSchemaFile: true,
//       plugins: [ApolloServerPluginLandingPageLocalDefault()],
//       introspection: true,
//       installSubscriptionHandlers: true,
//       subscriptions: {
//         'graphql-ws': true,
//         'subscriptions-transport-ws': true,
//       },
//     }),
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
//     }),
//     TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => {
//         return {
//           type: 'mysql',
//           host: 'localhost',
//           port: 3306,
//           username: 'root',
//           password: '',
//           database: 'en-db',
//           entities: [Conversation, Teacher, TeachingClass, User],
//           synchronize: true,
//         };
//       },
//     }),
//     OtpModule,
//     AuthModule,
//     UsersModule,
//     TeachersModule,
//     ConversationModule,
//     TeachingClassModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }
