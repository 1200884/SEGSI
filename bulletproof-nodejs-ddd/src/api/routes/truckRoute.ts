import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

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
        id: Joi.string().required(),
        tare: Joi.number().required(),
        maxWeight: Joi.number().required(),
        batteryCapacity: Joi.number().required(),
        truckAutonomy: Joi.number().required(),
        chargeTime: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next) );

  route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.getTruck(req, res, next) );

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        tare: Joi.number(),
        maxWeight: Joi.number(),
        batteryCapacity: Joi.number(),
        truckAutonomy: Joi.number(),
        chargeTime: Joi.number()
      }),
    }),
    (req, res, next) => ctrl.patchTruck(req, res, next));
};