import {
  FishingPlacesCreateDTO,
  FishingPlacesManyResponse,
  FishingPlacesResponse,
  FishingPlacesUpdateDTO,
  OkMessageResponse,
  PaginationDTO
} from "@courcework/common";
import { Response } from "express";
import { FishingPlacesMapper } from "../mappers/fishingplaces.mapper";
import { FishingPlacesService } from "../services/fishingplaces.service";
import { Body, Params, Query } from "../types/Requests";

export class FishingPlacesController {
  private readonly fishingPlacesService = new FishingPlacesService();
  private readonly fishingPlacesMapper = new FishingPlacesMapper();

  async getAll (req: Query<PaginationDTO>, res: Response<FishingPlacesManyResponse>) {
    const { data, pagination } = await this.fishingPlacesService.getAll(req.query);
    
    res.send({
      fishingPlaces: this.fishingPlacesMapper.getAll(data),
      pagination,
    });
  }

  async get (req: Params<{ id: string }>, res: Response<FishingPlacesResponse>) {
    const fisher = await this.fishingPlacesService.get(parseInt(req.params.id));
    res.send(
      this.fishingPlacesMapper.get(fisher)
    );
  }

  async create (req: Body<FishingPlacesCreateDTO>, res: Response<FishingPlacesResponse>) {
    const fisher = await this.fishingPlacesService.create(req.body)
    res.send(
      this.fishingPlacesMapper.get(fisher)
    );
  }

  async update (req: Params<{ id: string }> & Body<FishingPlacesUpdateDTO>, res: Response<FishingPlacesResponse>) {
    const fisher = await this.fishingPlacesService.update(parseInt(req.params.id), req.body)
    res.send(
      this.fishingPlacesMapper.get(fisher)
    );
  }

  async delete (req: Params<{ id: string }>, res: Response<OkMessageResponse>) {
    await this.fishingPlacesService.delete(parseInt(req.params.id));
    res.send({
      message: 'ok',
    });
  }
}