import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class OauthTOken {

    @Field({nullable:true})
    public accessToken: string;

    constructor(accessToken?: string) {
        this.accessToken = accessToken;
    }

}