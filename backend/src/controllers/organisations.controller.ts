import {
  OkMessageResponse,
  OrganisationCreateDTO,
  OrganisationResponse,
  OrganisationUpdateDTO,
  OrganisationsManyResponse,
  PaginationDTO
} from "@courcework/common";
import { Response } from "express";
import { OrganisationsMapper } from "../mappers/organisation.mapper";
import { OrganisationsService } from "../services/organisations.service";
import { Body, Params, Query } from "../types/Requests";

export class OrganisationsController {
  private readonly organisationService = new OrganisationsService();
  private readonly organisationMapper = new OrganisationsMapper();

  async getAll (req: Query<PaginationDTO>, res: Response<OrganisationsManyResponse>) {
    const { data, pagination } = await this.organisationService.getAll(req.query);
    res.send({
      organisations: this.organisationMapper.getAll(data),
      pagination,
    });
  }

  async get (req: Params<{ id: string }>, res: Response<OrganisationResponse>) {
    const fisher = await this.organisationService.get(parseInt(req.params.id));
    res.send(
      this.organisationMapper.get(fisher)
    );
  }

  async create (req: Body<OrganisationCreateDTO>, res: Response<OrganisationResponse>) {
    const fisher = await this.organisationService.create(req.body)
    res.send(
      this.organisationMapper.get(fisher)
    );
  }

  async update (req: Params<{ id: string }> & Body<OrganisationUpdateDTO>, res: Response<OrganisationResponse>) {
    const fisher = await this.organisationService.update(parseInt(req.params.id), req.body)
    res.send(
      this.organisationMapper.get(fisher)
    );
  }

  async delete (req: Params<{ id: string }>, res: Response<OkMessageResponse>) {
    await this.organisationService.delete(parseInt(req.params.id));
    res.send({
      message: 'ok',
    });
  }
}