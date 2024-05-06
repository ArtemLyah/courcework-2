import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { validationMessage } from "../utils/validation";
import { Type } from "class-transformer";

export class FishingPlacesCreateDTO {
  @IsNotEmpty(validationMessage('Name is required'))
    name: string;
  
  @IsNotEmpty(validationMessage('Organisation id is required'))
  @Type(() => Number)
  @IsNumber({}, validationMessage('Organisation id must be a number'))
    organisationId: number;
  
  @IsNotEmpty(validationMessage('Price is required'))
  @Type(() => Number)
  @IsNumber({}, validationMessage('Price must be a number'))
  @Min(0, validationMessage('Minimum price is 0'))
    price: number;
  
  @IsNotEmpty(validationMessage('Square is required'))
  @Type(() => Number)
  @IsNumber({}, validationMessage('Square must be a number'))
  @Min(0, validationMessage('Minimum square is 0'))
    square: number;
}