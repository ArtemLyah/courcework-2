import { IsOptional } from "class-validator";

export class OrganisationUpdateDTO {
  @IsOptional()
    name?: string;
}