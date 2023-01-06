import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
    createUser(req: Request, res: Response, next: NextFunction);
    signIn(id: string, req: Request, res: Response, next: NextFunction);
    disableUser(id: string, req: Request, res: Response, next: NextFunction);
}