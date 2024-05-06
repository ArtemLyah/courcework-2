import { OrganisationCreateDTO, OrganisationUpdateDTO, PaginationDTO } from "@courcework/common";
import { Organisation, Prisma } from "@prisma/client";
import { OrganisationRepository } from "../repositories/organisation.repository";
import { findEntityById } from "../utils/findEntity";
import { Paginate } from "../utils/pagination";

export class OrganisationsService {
  private readonly organisationRepository = new OrganisationRepository();
  
  getAll (pagination: PaginationDTO) {
    return Paginate<Organisation, Prisma.OrganisationFindManyArgs>(this.organisationRepository, {
      orderBy: {
        id: 'asc',
      }
    }, pagination);
  }

  async get (id: number) {
    return await findEntityById(id, 'Organisation', this.organisationRepository);
  }

  create ({ name }: OrganisationCreateDTO) {
    return this.organisationRepository.create({
      province: name,
    });
  }

  async update (id: number, { name }: OrganisationUpdateDTO) {
    await findEntityById(id, 'Organisation', this.organisationRepository);

    return this.organisationRepository.update({
      id,
    }, {
      province: name,
    });
  }

  async delete (id: number) {
    await findEntityById(id, 'Organisation', this.organisationRepository);

    return this.organisationRepository.delete({
      id,
    });
  }
}