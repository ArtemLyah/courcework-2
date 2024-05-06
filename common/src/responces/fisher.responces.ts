import { PaginationResponse } from "./pagination.response";

export class FisherResponse {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

export class FisherManyResponse {
  fishers: FisherResponse[];
  pagination: PaginationResponse;
}