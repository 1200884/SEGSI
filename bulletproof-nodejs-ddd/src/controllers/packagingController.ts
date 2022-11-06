import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPackagingController from "./IControllers/IPackagingController";
import IPackagingService from '../services/IServices/IPackagingService';
import IPackagingDTO from '../dto/IPackagingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PackagingController implements IPackagingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.packaging.name) private packagingServiceInstance : IPackagingService
  ) {}

  public async createPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = await this.packagingServiceInstance.createPackaging(req.body as IPackagingDTO) as Result<IPackagingDTO>;
        
      if (packagingOrError.isFailure) {
        return res.status(402).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.json( packagingDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = await this.packagingServiceInstance.updatePackaging(req.body as IPackagingDTO) as Result<IPackagingDTO>;

      if (packagingOrError.isFailure) {
        return res.status(404).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.status(201).json( packagingDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}