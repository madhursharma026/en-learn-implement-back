import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Question {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, {nullable: true})
    Title: string;

    @Field((type) => String, {nullable: true})
    Description: string;

    @Field((type) => String, {nullable: true})
    IsOptionInImageFormate: string;

    @Field((type) => String, {nullable: true})
    IsQuestionInImageFormate: string;

    @Field((type) => String, {nullable: true})
    IsQuestionInMCQsFormate: string;

    @Field((type) => String, {nullable: true})
    IsQuestionInInputFormate: string;

    @Field((type) => String, {nullable: true})
    IsQuestionInFillUpsFormate: string;

    @Field((type) => String, {nullable: true})
    IsQuestionInMatchingFormate: string;

    @Field((type) => String, {nullable: true})
    mainHeading: string;

    @Field((type) => String, {nullable: true})
    Question: string;

    @Field((type) => String, {nullable: true})
    Option1: string;

    @Field((type) => String, {nullable: true})
    Option2: string;

    @Field((type) => String, {nullable: true})
    Option3: string;

    @Field((type) => String, {nullable: true})
    Option4: string;

    @Field((type) => String, {nullable: true})
    correctAns: string;
}

