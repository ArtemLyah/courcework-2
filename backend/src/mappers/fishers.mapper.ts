import { FisherResponse } from "@courcework/common";
import { Fishers } from "@prisma/client";

export class FishersMapper {
  get (fisher: Fishers): FisherResponse {
    return {
      id: fisher.id,
      firstName: fisher.firstname,
      lastName: fisher.lastname,
      middleName: fisher.middlename,
      email: fisher.email,
      phone: fisher.phone,
      birthDate: fisher.birthday.toJSON(),
    };
  }

  getAll (fishers: Fishers[]): FisherResponse[] {
    return fishers.map(fisher => this.get(fisher));
  }
}