import { Organisation } from "@prisma/client";

export class DbFishingPlaces {
  id: number;
  name: string;
  square: number;
  price: string;
  organisation_id: number;
  organisation: Organisation;
}