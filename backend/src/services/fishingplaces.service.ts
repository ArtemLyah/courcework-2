import { FishingPlacesUpdateDTO, FishingPlacesCreateDTO, PaginationDTO } from "@courcework/common";
import { FishingPlacesRepository } from "../repositories/fishingplaces.repository";
import { OrganisationRepository } from "../repositories/organisation.repository";
import { findEntityById } from "../utils/findEntity";
import { Paginate } from "../utils/pagination";
import { DbFishingPlaces } from "../types/DbFishingPlaces";
import { Prisma } from "@prisma/client";

export class FishingPlacesService {
  private readonly placesRepository = new FishingPlacesRepository();
  private readonly organisationRepository = new OrganisationRepository();
  
  getAll (pagination: PaginationDTO) {
    return Paginate<DbFishingPlaces, Prisma.FishingPlacesFindManyArgs>(this.placesRepository, {
      orderBy: {
        id: 'asc',
      }
    }, pagination);
  }

  async get (id: number) {
    return await findEntityById(id, 'FishingPlace', this.placesRepository);
  }

  async create (data: FishingPlacesCreateDTO) {
    await findEntityById(data.organisationId, 'Organisation', this.organisationRepository);

    return this.placesRepository.create({
      name: data.name,
      price: data.price,
      square: data.square,
      organisation: {
        connect: {
          id: data.organisationId,
        },
      }
    });
  }

  async update (id: number, data: FishingPlacesUpdateDTO) {
    await findEntityById(id, 'FishingPlace', this.placesRepository);

    return this.placesRepository.update({
      id,
    }, {
      name: data.name,
      price: data.price,
      square: data.square,
    });
  }

  async delete (id: number) {
    await findEntityById(id, 'FishingPlace', this.placesRepository);

    return this.placesRepository.delete({
      id,
    });
  }
}