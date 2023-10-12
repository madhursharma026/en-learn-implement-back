import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'question' })
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Title: string;

    @Column()
    Description: string;

    @Column()
    IsOptionInImageFormate: string;

    @Column()
    IsQuestionInImageFormate: string;

    @Column()
    IsQuestionInMCQsFormate: string;

    @Column()
    IsQuestionInInputFormate: string;

    @Column()
    IsQuestionInFillUpsFormate: string;

    @Column()
    IsQuestionInMatchingFormate: string;

    @Column()
    mainHeading: string;

    @Column()
    Question: string;

    @Column()
    Option1: string;

    @Column()
    Option2: string;

    @Column()
    Option3: string;

    @Column()
    Option4: string;

    @Column()
    correctAns: string;
}

