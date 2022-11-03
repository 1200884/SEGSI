import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPathController from '../../controllers/IControllers/IPathController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/path', route);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;
/*  warehouseDestination:string; warehouse id, 1 -> 17
    warehouseDeparture:string; warehouse id, 1 -> 17
    distance: number;//in kms
    travelTime: number;//in minutes
    energyNecessary: number//in kwh
    additionalTime:number */
  route.post('',
    celebrate({
      body: Joi.object({
        warehouseDestination: Joi.number().required(),
        warehouseDeparture: Joi.number().required(),
        distance: Joi.number().required(),
        travelTime: Joi.number().required(),
        energyNecessary: Joi.number().required(),
        additionalTime: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createPath(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        warehouseDestination: Joi.number().required(),
        warehouseDeparture: Joi.number().required(),
        distance: Joi.number().required(),
        travelTime: Joi.number().required(),
        energyNecessary: Joi.number().required(),
        additionalTime: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updatePath(req, res, next) );
    route.get('/',(req,res,next)=>{
        ctrl.updatePath(req,res,next);
    })


}