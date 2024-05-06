import { FishingPlacesResponse } from "@courcework/common";
import { DbFishingPlaces } from "../types/DbFishingPlaces";

export class FishingPlacesMapper {
  get (fishingPlaces: DbFishingPlaces): FishingPlacesResponse {
    return {
      id: fishingPlaces.id,
      name: fishingPlaces.name,
      organisation: {
        id: fishingPlaces.organisation.id,
        name: fishingPlaces.organisation.province,
      },
      price: parseFloat(fishingPlaces.price),
      square: fishingPlaces.square,
    };
  }

  getAll (fishingPlaces: DbFishingPlaces[]): FishingPlacesResponse[] {
    return fishingPlaces.map(place => this.get(place));
  }
}