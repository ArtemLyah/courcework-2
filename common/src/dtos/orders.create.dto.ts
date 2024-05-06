import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { validationMessage } from "../utils/validation";
import { OrderStatus } from "../types/OrderStatus";
import { Type } from "class-transformer";

export class OrdersCreateDTO {
  @IsNotEmpty(validationMessage('Fisher id is required'))
  @Type(() => Number)
  @IsNumber({}, validationMessage('Fisher id must be a number'))
    fisherId: number;
  
  @IsNotEmpty(validationMessage('Place id is required'))
  @Type(() => Number)
  @IsNumber({}, validationMessage('Place id must be a number'))
    placeId: number;
  
  @IsOptional()
  @IsEnum(OrderStatus, validationMessage('Order status is invalid'))
    status?: OrderStatus;
  
  @IsNotEmpty(validationMessage('Fishing start date is required'))
  @IsDateString({ strict: true }, validationMessage('Fishing start date is invalid'))
    fishingStart: string;
  
  @IsNotEmpty(validationMessage('Fishing end date is required'))
  @IsDateString({ strict: true }, validationMessage('Fishing end date is invalid'))
    fishingEnd: string;
}