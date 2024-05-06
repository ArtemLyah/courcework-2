import { IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { validationMessage } from "../utils/validation";

export class FisherCreateDTO {
  @IsNotEmpty(validationMessage('First name is required'))
    firstName: string;
  
  @IsNotEmpty(validationMessage('Second name is required'))
    secondName: string;
  
  @IsNotEmpty(validationMessage('Last name is required'))
    lastName: string;
  
  @IsNotEmpty(validationMessage('Birth date is required'))
  @IsDateString({
    strict: true,
  }, validationMessage('Birth date is invalid'))
    birthDate: string;
  
  @IsNotEmpty(validationMessage('Email is required'))
  @IsEmail({}, validationMessage('Email must be in email format'))
    email: string;
  
  @IsNotEmpty(validationMessage('Phone is required'))
  @IsPhoneNumber('UA', validationMessage('Phone must be in UA format'))
    phone: string;
}