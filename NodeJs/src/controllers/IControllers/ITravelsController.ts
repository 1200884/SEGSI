import { Request, Response, NextFunction } from 'express';

export default interface ITravelsController  {
  getTravels(date: string, req: Request, res: Response, next: NextFunction);
}