import { Prisma, PrismaClient } from "@prisma/client";

export class FishersRepository {
  private readonly prisma = new PrismaClient();

  findMany(where: Prisma.FishersWhereInput, args?: Prisma.FishersFindManyArgs) {
    return this.prisma.fishers.findMany({
      where,
      ...args,
    });
  }

  findOne(where: Prisma.FishersWhereInput) {
    return this.prisma.fishers.findFirst({
      where,
    });
  }

  create(data: Prisma.FishersCreateInput) {
    return this.prisma.fishers.create({
      data,
    });
  }

  update(where: Prisma.FishersWhereUniqueInput, data: Prisma.FishersUpdateInput) {
    return this.prisma.fishers.update({
      where,
      data,
    });
  }

  delete(where: Prisma.FishersWhereUniqueInput) {
    return this.prisma.fishers.delete({
      where,
    });
  }

  count(where: Prisma.FishersWhereInput) {
    return this.prisma.fishers.count({
      where,
    });
  }
}