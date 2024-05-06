import { BodyException, OrdersCreateDTO, OrdersUpdateDTO, PaginationDTO } from "@courcework/common";
import { Prisma } from "@prisma/client";
import config from "../config";
import { FishersRepository } from "../repositories/fishers.repository";
import { FishingPlacesRepository } from "../repositories/fishingplaces.repository";
import { OrdersRepository } from "../repositories/orders.repository";
import { DbOrder } from "../types/DbOrders";
import { findEntityById } from "../utils/findEntity";
import { Paginate } from "../utils/pagination";

export class OrdersService {
  private readonly ordersRepository = new OrdersRepository();
  private readonly fishersRepository = new FishersRepository();
  private readonly fishingPlacesRepository = new FishingPlacesRepository();
  
  getAll (pagination: PaginationDTO) {
    return Paginate<DbOrder, Prisma.OrdersFindManyArgs>(this.ordersRepository, {
      orderBy: {
        id: 'asc',
      }
    }, pagination);
  }

  async get (id: number) {
    return await findEntityById(id, 'Orders', this.ordersRepository);
  }

  async create (data: OrdersCreateDTO) {
    await findEntityById(data.fisherId, 'Fisher', this.fishersRepository);
    await findEntityById(data.placeId, 'Place', this.fishingPlacesRepository);

    const fishingStartDate = new Date(data.fishingStart).getTime() - config.TIMEZONE_OFFSET*60*60*1000;
    const fishingEndDate = new Date(data.fishingEnd).getTime() - config.TIMEZONE_OFFSET*60*60*1000;

    if (fishingStartDate > fishingEndDate) {
      throw new BodyException('Fishing start date should be less than fishing end date');
    }

    return this.ordersRepository.create({
      fishing_start: new Date(fishingStartDate),
      fishing_end: new Date(fishingEndDate),
      status: data.status ?? 'PENDING',
      fishers: {
        connect: {
          id: data.fisherId,
        },
      },
      fishingPlaces: {
        connect: {
          id: data.placeId,
        },
      },
    });
  }

  async update (id: number, data: OrdersUpdateDTO) {
    const orders = await findEntityById(id, 'Order', this.ordersRepository);

    let fishingStartDate;
    let fishingEndDate;

    if (data.fishingStart) {
      fishingStartDate = new Date(data.fishingStart).getTime() - config.TIMEZONE_OFFSET*60*60*1000;
      fishingStartDate = new Date(fishingStartDate)
    }
    if (data.fishingEnd) {
      fishingEndDate = new Date(data.fishingEnd).getTime() - config.TIMEZONE_OFFSET*60*60*1000;
      fishingEndDate = new Date(fishingEndDate)
    }

    if (fishingStartDate > fishingEndDate || orders.fishing_start > fishingEndDate || orders.fishing_end < fishingStartDate) {
      throw new BodyException('Fishing start date should be less than fishing end date');
    }

    return this.ordersRepository.update({
      id,
    }, {
      fishing_start: fishingStartDate,
      fishing_end: fishingEndDate,
      status: data.status,
    });
  }

  async delete (id: number) {
    await findEntityById(id, 'Order', this.ordersRepository);

    return this.ordersRepository.delete({
      id,
    });
  }
}