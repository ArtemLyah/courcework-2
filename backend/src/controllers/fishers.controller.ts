import {
  FisherCreateDTO,
  FisherManyResponse,
  FisherResponse,
  OkMessageResponse,
  PaginationDTO,
} from "@courcework/common";
import { Response } from "express";
import { FishersMapper } from "../mappers/fishers.mapper";
import { FishersService } from "../services/fishers.service";
import { Query, Params, Body } from "../types/Requests";

export class FishersController {
  private readonly fishersService = new FishersService();
  private readonly fisherMapper = new FishersMapper();

  async getAll (req: Query<PaginationDTO>, res: Response<FisherManyResponse>) {
    const { data, pagination } = await this.fishersService.getAll(req.query);
    res.send({
      fishers: this.fisherMapper.getAll(data),
      pagination,
    });
  }

  async get (req: Params<{ id: string }>, res: Response<FisherResponse>) {
    const fisher = await this.fishersService.get(parseInt(req.params.id));
    res.send(
      this.fisherMapper.get(fisher)
    );
  }

  async create (req: Body<FisherCreateDTO>, res: Response<FisherResponse>) {
    const fisher = await this.fishersService.create(req.body)
    res.send(
      this.fisherMapper.get(fisher)
    );
  }

  async update (req: Params<{ id: string }> & Body<FisherCreateDTO>, res: Response<FisherResponse>) {
    const fisher = await this.fishersService.update(parseInt(req.params.id), req.body)
    res.send(
      this.fisherMapper.get(fisher)
    );
  }

  async delete (req: Params<{ id: string }>, res: Response<OkMessageResponse>) {
    await this.fishersService.delete(parseInt(req.params.id));
    res.send({
      message: 'ok',
    });
  }
}