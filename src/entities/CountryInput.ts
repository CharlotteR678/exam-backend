import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCountryInput {
  @Field()
  @IsString()
  code!: string;

  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  emoji!: string;
}
