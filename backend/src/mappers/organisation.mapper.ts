import { OrganisationResponse } from "@courcework/common";
import { Organisation } from "@prisma/client";

export class OrganisationsMapper {
  get (organisation: Organisation): OrganisationResponse {
    return {
      id: organisation.id,
      name: organisation.province,
    };
  }

  getAll (organisations: Organisation[]): OrganisationResponse[] {
    return organisations.map(organisation => this.get(organisation));
  }
}