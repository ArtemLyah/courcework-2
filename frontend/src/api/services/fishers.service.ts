import { 
  FisherCreateDTO, 
  FisherManyResponse, 
  FisherResponse, 
  FisherUpdateDTO, 
  OkMessageResponse, 
  PaginationDTO 
} from "@courcework/common";
import axios from "axios";
import urls from "../urls";

class FishersService {
  async create (data: FisherCreateDTO): Promise<FisherResponse> {
    return await axios.post(
      urls.fishers.create, data
    ).then(response => response.data);
  }

  async getOne (fisherId: number): Promise<FisherResponse> {
    return await axios.get(
      urls.fishers.getOne(fisherId)
    ).then(response => response.data);
  }

  async getAll (data?: PaginationDTO): Promise<FisherManyResponse> {
    return await axios.get(urls.fishers.getAll, {
      params: data,
    }).then(response => response.data);
  }

  async update (fisherId: number, data: FisherUpdateDTO): Promise<FisherResponse> {
    return await axios.patch(
      urls.fishers.update(fisherId), 
      data,
    ).then(response => response.data);
  }

  async delete (fisherId: number): Promise<OkMessageResponse> {
    return await axios.delete(
      urls.fishers.delete(fisherId)
    ).then(response => response.data);;
  }
}

const fishersService = new FishersService();

export default fishersService;