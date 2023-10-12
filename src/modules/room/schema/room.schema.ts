import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Room {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, {nullable: true})
    roomName: string;

    @Field((type) => Int, {nullable: true})
    participants: number;

    @Field((type) => String, {nullable: true})
    firstParticipantToken: string;

    @Field((type) => String, {nullable: true})
    secondParticipantToken: string;

    @Field((type) => String)
    createdAt: String;
}

