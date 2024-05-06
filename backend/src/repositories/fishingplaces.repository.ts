import { Prisma, PrismaClient } from "@prisma/client";
import { DbFishingPlaces } from "../types/DbFishingPlaces";

export class FishingPlacesRepository {
  private readonly prisma = new PrismaClient();
  private readonly include: Prisma.FishingPlacesInclude = {
    organisation: true,
  };

  findMany(where: Prisma.FishingPlacesWhereInput, args?: Prisma.FishingPlacesFindManyArgs) {
    return this.prisma.fishingPlaces.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as Promise<DbFishingPlaces[]>;
  }

  findOne(where: Prisma.FishingPlacesWhereUniqueInput) {
    return this.prisma.fishingPlaces.findUnique({
      where,
      include: this.include,
    }) as unknown as Promise<DbFishingPlaces>;
  }

  create(data: Prisma.FishingPlacesCreateInput) {
    return this.prisma.fishingPlaces.create({
      data,
      include: this.include,
    }) as unknown as Promise<DbFishingPlaces>;
  }

  update(where: Prisma.FishingPlacesWhereUniqueInput, data: Prisma.FishingPlacesUpdateInput) {
    return this.prisma.fishingPlaces.update({
      where,
      data,
      include: this.include,
    }) as unknown as Promise<DbFishingPlaces>;
  }

  delete(where: Prisma.FishingPlacesWhereUniqueInput) {
    return this.prisma.fishingPlaces.delete({
      where,
      include: this.include,
    }) as unknown as Promise<DbFishingPlaces>;
  }

  count(where: Prisma.FishingPlacesWhereInput) {
    return this.prisma.fishingPlaces.count({
      where,
    });
  }
}