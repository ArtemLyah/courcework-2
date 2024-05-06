import { OrderStatus } from "../types/OrderStatus";
import { PaginationResponse } from "./pagination.response";

class FisherData {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

class PlaceData {
  id: number;
  name: string;
  price: number;
  square: number;
}

export class OrdersResponse {
  id: number;
  fisher: FisherData;
  place: PlaceData;
  createdAt: string;
  fishingStart: string;
  fishingEnd: string;
  status: OrderStatus;
}

export class OrdersManyResponse {
  orders: OrdersResponse[];
  pagination: PaginationResponse;
}