import { OrderStatus } from "@courcework/common";
import { Fishers, FishingPlaces } from "@prisma/client";

export class DbOrder {
  id: number;
  status: OrderStatus;
  fishing_start: Date;
  fishing_end: Date;
  createdat: Date;
  fisher_id: number;
  place_id: number;
  fishers: Fishers;
  fishingPlaces: FishingPlaces;
}