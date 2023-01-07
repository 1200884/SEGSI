import { Request, Response, NextFunction } from 'express';

export default interface IGeneticPlanningController  {
  getGeneticPlanning(date: string,geracoes:string,populacao:string,cruzamento:string,mutacao:string, req: Request, res: Response, next: NextFunction);
}