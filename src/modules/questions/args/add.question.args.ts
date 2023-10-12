import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class AddQuestionArgs {
    @Field({ nullable: false })
    Title: string;
    
    @Field({ nullable: false })
    Description: string;
    
    @Field({ nullable: false })
    IsOptionInImageFormate: string;
    
    @Field({ nullable: false })
    IsQuestionInImageFormate: string;
    
    @Field({ nullable: false })
    IsQuestionInMCQsFormate: string;
    
    @Field({ nullable: false })
    IsQuestionInInputFormate: string;
    
    @Field({ nullable: false })
    IsQuestionInFillUpsFormate: string;
    
    @Field({ nullable: false })
    IsQuestionInMatchingFormate: string;
    
    @Field({ nullable: false })
    mainHeading: string;
    
    @Field({ nullable: false })
    Question: string;
    
    @Field({ nullable: false })
    Option1: string;
    
    @Field({ nullable: false })
    Option2: string;
    
    @Field({ nullable: false })
    Option3: string;
    
    @Field({ nullable: false })
    Option4: string;
    
    @Field({ nullable: false })
    correctAns: string;    
}
