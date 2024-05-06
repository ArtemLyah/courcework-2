import { IsDateString, IsEmail, IsOptional, IsPhoneNumber } from "class-validator";
import { validationMessage } from "../utils/validation";

export class FisherUpdateDTO {
  @IsOptional()
    firstName?: string;
  
  @IsOptional()
    secondName?: string;
  
  @IsOptional()
    lastName?: string;
  
  @IsOptional()
  @IsDateString({ 
    strict: true,
  }, validationMessage('Birth date is invalid'))
    birthDate?: string;
  
  @IsOptional()
  @IsEmail({}, validationMessage('Email must be in email format'))
    email?: string;
  
  @IsOptional()
  @IsPhoneNumber('UA', validationMessage('Phone must be in UA format'))
    phone?: string;
}