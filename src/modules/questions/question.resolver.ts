import { Question } from "./schema/question.schema";
import { QuestionService } from "./question.service";
import { AddQuestionArgs } from "./args/add.question.args";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

@Resolver(of => Question)
export class QuestionResolver {
    constructor(private readonly questionService: QuestionService) { }

    @Mutation(returns => [Question], { name: 'questions' })
    findAllQuestions() {
        return this.questionService.findAllQuestions();
    }

    @Mutation(returns => Question, { name: 'addQuestion' })
    addQuestion(@Args('addQuestionArgs') addQuestionArgs: AddQuestionArgs) {
        return this.questionService.addQuestion(addQuestionArgs);
    }
}

