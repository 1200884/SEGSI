import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IGeneticPlanningController from '../../controllers/IControllers/IGeneticPlanningController';

const route = Router();

export default (app: Router) => {
  app.use('/geneticplanning', route);

  const ctrl = Container.get(config.controllers.geneticplanning.name) as IGeneticPlanningController;
  
  route.post('/get-geneticplanning',
  celebrate({
    body: Joi.object({
      date: Joi.string().required(),
      warehouseDestination: Joi.number().required(),
      distance: Joi.number().required(),
      travelTime:Joi.number().required(),
      energyNecessary: Joi.number().required(),
      additionalTime: Joi.number().required()
    })
  }),
  (req, res, next) => ctrl.getGeneticPlanning(req, res, next));

  
};