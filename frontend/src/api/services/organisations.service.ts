import {
  OkMessageResponse,
  OrganisationCreateDTO,
  OrganisationResponse,
  OrganisationUpdateDTO,
  OrganisationsManyResponse,
  PaginationDTO
} from "@courcework/common";
import axios from "axios";
import urls from "../urls";

class OrganisationsService {
  async create (data: OrganisationCreateDTO): Promise<OrganisationResponse> {
    return await axios.post(
      urls.organisations.create, data
    ).then(response => response.data);
  }

  async getOne (organisationId: number): Promise<OrganisationResponse> {
    return await axios.get(
      urls.organisations.getOne(organisationId)
    ).then(response => response.data);
  }

  async getAll (data?: PaginationDTO): Promise<OrganisationsManyResponse> {
    return await axios.get(urls.organisations.getAll, {
      params: data,
    }).then(response => response.data);
  }

  async update (organisationId: number, data: OrganisationUpdateDTO): Promise<OrganisationResponse> {
    return await axios.patch(
      urls.organisations.update(organisationId), 
      data,
    ).then(response => response.data);
  }

  async delete (organisationId: number): Promise<OkMessageResponse> {
    return await axios.delete(
      urls.organisations.delete(organisationId)
    ).then(response => response.data);;
  }
}

const organisationsService = new OrganisationsService();

export default organisationsService;