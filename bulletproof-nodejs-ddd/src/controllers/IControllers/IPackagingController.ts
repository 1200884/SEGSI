import { Request, Response, NextFunction } from 'express';

export default interface IPackagingController  {
  createPackaging(req: Request, res: Response, next: NextFunction);
  updatePackaging(req: Request, res: Response, next: NextFunction);
 // listPath(req: Request, res: Response, next: NextFunction);
  //deletePath(req: Request, res: Response, next: NextFunction);
}