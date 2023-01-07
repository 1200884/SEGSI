import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IGeneticPlanningController from '../../controllers/IControllers/IGeneticPlanningController';

const route = Router();

export default (app: Router) => {
  app.use('/geneticplanning', route);

  const ctrl = Container.get(config.controllers.geneticplanning.name) as IGeneticPlanningController;

  route.get('/:date/:geracoes/:populacao/:cruzamento/:mutacao/', (req, res, next) => ctrl.getGeneticPlanning(req.params.date,req.params.geracoes,req.params.populacao,req.params.cruzamento,req.params.mutacao,req, res, next));
};