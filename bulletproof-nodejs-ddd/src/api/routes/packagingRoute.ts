import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPackagingController from '../../controllers/IControllers/IPackagingController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/packaging', route);

  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;
/*  
  packagingId: number;
  boxId: number;
  positionX : number;
  positionY : number;
  positionZ : number */
  route.post('',
    celebrate({
      body: Joi.object({
        boxId: Joi.number().required(),
        positionX: Joi.number().required(),
        positionY: Joi.number().required(),
        positionZ: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        packagingId: Joi.number().required(),
        boxId: Joi.number().required(),
        positionX: Joi.number().required(),
        positionY: Joi.number().required(),
        positionZ: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next) );
    route.get('/',(req,res,next)=>{
        ctrl.updatePackaging(req,res,next);
    })


}