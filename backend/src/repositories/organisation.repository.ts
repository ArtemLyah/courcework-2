import { Prisma, PrismaClient } from "@prisma/client";

export class OrganisationRepository {
  private readonly prisma = new PrismaClient();

  async findMany(where: Prisma.OrganisationWhereInput, args?: Prisma.OrganisationFindManyArgs) {
    return this.prisma.organisation.findMany({
      where,
      ...args,
    });
  }

  async findOne(where: Prisma.OrganisationWhereUniqueInput) {
    return this.prisma.organisation.findUnique({
      where,
    });
  }

  async create(data: Prisma.OrganisationCreateInput) {
    return this.prisma.organisation.create({
      data,
    });
  }

  async update(where: Prisma.OrganisationWhereUniqueInput, data: Prisma.OrganisationUpdateInput) {
    return this.prisma.organisation.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.OrganisationWhereUniqueInput) {
    return this.prisma.organisation.delete({
      where,
    });
  }

  count(where: Prisma.OrganisationWhereInput) {
    return this.prisma.organisation.count({
      where,
    });
  }
}