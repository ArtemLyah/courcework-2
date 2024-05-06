import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "../types/OrderStatus";
import { validationMessage } from "../utils/validation";

export class OrdersUpdateDTO {
  @IsOptional()
  @IsEnum(OrderStatus, validationMessage('Order status is invalid'))
    status?: OrderStatus;
  
  @IsOptional()
  @IsDateString({ strict: true }, validationMessage('Fishing start date is invalid'))
    fishingStart?: string;
  
  @IsOptional()
  @IsDateString({ strict: true }, validationMessage('Fishing end date is invalid'))
    fishingEnd?: string;
}