import { IsNotEmpty } from "class-validator";
import { validationMessage } from "../utils/validation";

export class OrganisationCreateDTO {
  @IsNotEmpty(validationMessage('Organisation name is required'))
    name: string;
}