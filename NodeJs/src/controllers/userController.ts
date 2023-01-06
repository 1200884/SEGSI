import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';
import { IUserDTO } from '../dto/IUserDTO';
import { Result } from "../core/logic/Result";

@Service()
export default class UserController implements IUserController {
    constructor(
        @Inject(config.services.user.name) private userServiceInstance : IUserService
    ) {}
    public async createUser(req: Request , res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<IUserDTO>;
              
            if (userOrError.isFailure) {
              return res.status(402).send();
            }
      
            const userDTO = userOrError.getValue();
            return res.json( userDTO ).status(201);
          }
          catch (e) {
            return next(e);
          }
    }
    public async signIn(id: string, req: Request , res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.signIn(id) as Result<IUserDTO>;
              
            if (userOrError.isFailure) {
              return res.status(404).send();
            }
      
            const userDTO = userOrError.getValue();
            return res.status(201).json( userDTO );
          }
          catch (e) {
            return next(e);
          }
    }
    public async disableUser(id: string, req: Request , res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.disableUser(id) as Result<IUserDTO>;
              
            if (userOrError.isFailure) {
              return res.status(404).send();
            }
      
            const userDTO = userOrError.getValue();
            return res.status(200).json( userDTO );
          }
          catch (e) {
            return next(e);
          }
    }
}
