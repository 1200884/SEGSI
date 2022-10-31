import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/truck', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;
/* tare:number;
    maxWeight:number;
    batteryCapacity: number;//in kwh
    truckAutonomy: number;//in km
    chargeTime:number*/
  route.post('',
    celebrate({
      body: Joi.object({
        tare: Joi.number().required(),
        maxWeight: Joi.number().required(),
        batteryCapacity: Joi.number().required(),
        truckAutonomy: Joi.number().required(),
        chargeTime: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        tare: Joi.number().required(),
        maxWeight: Joi.number().required(),
        batteryCapacity: Joi.number().required(),
        truckAutonomy: Joi.number().required(),
        chargeTime: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next) );
    route.get('/',(req,res,next)=>{
        ctrl.updateTruck(req,res,next);
    })


}