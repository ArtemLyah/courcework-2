import { Prisma, PrismaClient } from "@prisma/client";
import { DbOrder } from "../types/DbOrders";

export class OrdersRepository {
  private readonly prisma = new PrismaClient();
  private readonly include: Prisma.OrdersInclude = {
    fishers: true,
    fishingPlaces: true,
  };

  async findMany(where: Prisma.OrdersWhereInput, args?: Prisma.OrdersFindManyArgs) {
    return this.prisma.orders.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as Promise<DbOrder[]>;
  }

  async findOne(where: Prisma.OrdersWhereUniqueInput) {
    return this.prisma.orders.findUnique({
      where,
      include: this.include,
    }) as unknown as Promise<DbOrder>;
  }

  async create(data: Prisma.OrdersCreateInput) {
    return this.prisma.orders.create({
      data,
      include: this.include,
    })  as unknown as Promise<DbOrder>;
  }

  async update(where: Prisma.OrdersWhereUniqueInput, data: Prisma.OrdersUpdateInput) {
    return this.prisma.orders.update({
      where,
      data,
      include: this.include,
    }) as unknown as Promise<DbOrder>;
  }

  async delete(where: Prisma.OrdersWhereUniqueInput) {
    return this.prisma.orders.delete({
      where,
      include: this.include,
    }) as unknown as Promise<DbOrder>;
  }

  count(where: Prisma.OrdersWhereInput) {
    return this.prisma.orders.count({
      where,
    });
  }
}