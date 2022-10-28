import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  createPath(req: Request, res: Response, next: NextFunction);
  updatePath(req: Request, res: Response, next: NextFunction);
  listPath(req: Request, res: Response, next: NextFunction);
  deletePath(req: Request, res: Response, next: NextFunction);
}