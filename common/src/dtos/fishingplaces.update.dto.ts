import { IsNumber, IsOptional, Min } from "class-validator";
import { validationMessage } from "../utils/validation";
import { Type } from "class-transformer";

export class FishingPlacesUpdateDTO {
  @IsOptional()
    name?: string;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Price must be a number'))
  @Min(0, validationMessage('Minimum price is 0'))
    price?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Square must be a number'))
  @Min(0, validationMessage('Minimum square is 0'))
    square?: number;
}