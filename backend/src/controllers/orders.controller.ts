import {
  OkMessageResponse,
  OrdersCreateDTO,
  OrdersManyResponse,
  OrdersResponse,
  OrdersUpdateDTO,
  PaginationDTO,
} from "@courcework/common";
import { Response } from "express";
import { OrdersMapper } from "../mappers/orders.mapper";
import { OrdersService } from "../services/orders.service";
import { Body, Params, Query } from "../types/Requests";

export class OrdersController {
  private readonly orsersService = new OrdersService();
  private readonly ordersMapper = new OrdersMapper();

  async getAll (req: Query<PaginationDTO>, res: Response<OrdersManyResponse>) {
    const { data, pagination } = await this.orsersService.getAll(req.query);
    res.send({
      orders: this.ordersMapper.getAll(data),
      pagination,
    });
  }

  async get (req: Params<{ id: string }>, res: Response<OrdersResponse>) {
    const order = await this.orsersService.get(parseInt(req.params.id));
    res.send(
      this.ordersMapper.get(order)
    );
  }

  async create (req: Body<OrdersCreateDTO>, res: Response<OrdersResponse>) {
    const order = await this.orsersService.create(req.body)
    res.send(
      this.ordersMapper.get(order)
    );
  }

  async update (req: Params<{ id: string }> & Body<OrdersUpdateDTO>, res: Response<OrdersResponse>) {
    const order = await this.orsersService.update(parseInt(req.params.id), req.body)
    res.send(
      this.ordersMapper.get(order)
    );
  }

  async delete (req: Params<{ id: string }>, res: Response<OkMessageResponse>) {
    await this.orsersService.delete(parseInt(req.params.id));
    res.send({
      message: 'ok',
    });
  }
}