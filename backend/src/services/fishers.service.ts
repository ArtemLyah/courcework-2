import {
  BodyException,
  FisherCreateDTO,
  FisherUpdateDTO,
  PaginationDTO,
  UniqueEntityException
} from "@courcework/common";
import { Fishers, Prisma } from "@prisma/client";
import { FishersRepository } from "../repositories/fishers.repository";
import { findEntityById } from "../utils/findEntity";
import { Paginate } from "../utils/pagination";

export class FishersService {
  private readonly fishersRepository = new FishersRepository();
  
  getAll (pagination: PaginationDTO) {
    return Paginate<Fishers, Prisma.FishersFindManyArgs>(this.fishersRepository, {
      orderBy: {
        id: 'asc',
      }
    }, pagination);
  }

  async get (id: number) {
    return await findEntityById(id, 'Fisher', this.fishersRepository);
  }

  async create (data: FisherCreateDTO) {
    if (await this.fishersRepository.findOne({
      OR: [
        { email: data.email },
        { phone: data.phone },
      ],
    })) {
      throw new BodyException('Fisher must have unique email and phone');
    }

    return this.fishersRepository.create({
      firstname: data.firstName,
      middlename: data.secondName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      birthday: new Date(data.birthDate),
    });
  }

  async update (id: number, data: FisherUpdateDTO) {
    await findEntityById(id, 'Fisher', this.fishersRepository);

    if (await this.fishersRepository.findOne({
      OR: [
        { email: data.email },
        { phone: data.phone },
      ],
    })) {
      throw new UniqueEntityException('Fisher');
    }

    return this.fishersRepository.update({
      id,
    }, {
      firstname: data.firstName,
      middlename: data.secondName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      birthday: data.birthDate ? new Date(data.birthDate) : undefined,
    });
  }

  async delete (id: number) {
    await findEntityById(id, 'Fisher', this.fishersRepository);

    return this.fishersRepository.delete({
      id,
    });
  }
}