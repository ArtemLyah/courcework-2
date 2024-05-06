import {
  FishingPlacesCreateDTO,
  FishingPlacesManyResponse,
  FishingPlacesResponse,
  FishingPlacesUpdateDTO,
  OkMessageResponse,
  PaginationDTO,
} from "@courcework/common";
import axios from "axios";
import urls from "../urls";

class PlacesService {
  async create (data: FishingPlacesCreateDTO): Promise<FishingPlacesResponse> {
    return await axios.post(
      urls.places.create, data
    ).then(response => response.data);
  }

  async getOne (placeId: number): Promise<FishingPlacesResponse> {
    return await axios.get(
      urls.places.getOne(placeId)
    ).then(response => response.data);
  }

  async getAll (data?: PaginationDTO): Promise<FishingPlacesManyResponse> {
    return await axios.get(urls.places.getAll, {
      params: data,
    }).then(response => response.data);
  }

  async update (placeId: number, data: FishingPlacesUpdateDTO): Promise<FishingPlacesResponse> {
    return await axios.patch(
      urls.places.update(placeId), 
      data,
    ).then(response => response.data);
  }

  async delete (placeId: number): Promise<OkMessageResponse> {
    return await axios.delete(
      urls.places.delete(placeId)
    ).then(response => response.data);;
  }
}

const placesService = new PlacesService();

export default placesService;