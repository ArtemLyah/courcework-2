import { PaginationResponse } from "./pagination.response";

class OrganisationData { 
  id: number;
  name: string;
}

export class FishingPlacesResponse {
  id: number;
  name: string;
  price: number;
  square: number;
  organisation: OrganisationData;
}

export class FishingPlacesManyResponse {
  fishingPlaces: FishingPlacesResponse[];
  pagination: PaginationResponse;
}