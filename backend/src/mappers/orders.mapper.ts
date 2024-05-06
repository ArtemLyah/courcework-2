import { OrdersResponse } from "@courcework/common";
import { DbOrder } from "../types/DbOrders";

export class OrdersMapper {
  get (order: DbOrder): OrdersResponse {
    return {
      id: order.id,
      fishingStart: order.fishing_start.toJSON(),
      fishingEnd: order.fishing_end.toJSON(),
      createdAt: order.createdat.toJSON(),
      status: order.status,
      fisher: {
        id: order.fishers.id,
        fullName: `${order.fishers.lastname} ${order.fishers.firstname} ${order.fishers.middlename}`,
        email: order.fishers.email,
        phone: order.fishers.phone,
      },
      place: {
        id: order.fishingPlaces.id,
        name: order.fishingPlaces.name,
        price: order.fishingPlaces.price.toNumber(),
        square: order.fishingPlaces.square,
      }
    };
  }

  getAll (orders: DbOrder[]): OrdersResponse[] {
    return orders.map(order => this.get(order));
  }
}