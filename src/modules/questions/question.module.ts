import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionResolver } from "./question.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionEntity } from "./entities/question.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuestionEntity])],
    controllers: [],
    providers: [QuestionService, QuestionResolver],
})

export class QuestionModule { }