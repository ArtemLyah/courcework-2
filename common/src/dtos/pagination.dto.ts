import { IsNumber, IsOptional } from "class-validator";
import { validationMessage } from "../utils/validation";
import { Type } from "class-transformer";

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Page must be a number'))
    page?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Page must be a number'))
    pageSize?: number;
}