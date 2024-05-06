import { PaginationResponse } from "./pagination.response";

export class OrganisationResponse {
  id: number;
  name: string;
}

export class OrganisationsManyResponse {
  organisations: OrganisationResponse[];
  pagination: PaginationResponse;
}