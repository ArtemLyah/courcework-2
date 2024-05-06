import { 
  OkMessageResponse, 
  OrdersCreateDTO, 
  OrdersManyResponse, 
  OrdersResponse, 
  OrdersUpdateDTO, 
  PaginationDTO 
} from "@courcework/common";
import axios from "axios";
import urls from "../urls";

class OrdersService {
  async create (data: OrdersCreateDTO): Promise<OrdersResponse> {
    return await axios.post(
      urls.orders.create, data
    ).then(response => response.data);
  }

  async getOne (ordersId: number): Promise<OrdersResponse> {
    return await axios.get(
      urls.orders.getOne(ordersId)
    ).then(response => response.data);
  }

  async getAll (data?: PaginationDTO): Promise<OrdersManyResponse> {
    return await axios.get(urls.orders.getAll, {
      params: data,
    }).then(response => response.data);
  }

  async update (ordersId: number, data: OrdersUpdateDTO): Promise<OrdersResponse> {
    return await axios.patch(
      urls.orders.update(ordersId), 
      data,
    ).then(response => response.data);
  }

  async delete (ordersId: number): Promise<OkMessageResponse> {
    return await axios.delete(
      urls.orders.delete(ordersId)
    ).then(response => response.data);
  }
}

const ordersService = new OrdersService();

export default ordersService;