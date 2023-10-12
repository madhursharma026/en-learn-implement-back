import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class JoinRoomArgs {
    @Field({ nullable: false })
    username: string;
}
