import { Service, Inject } from 'typedi';
import config from "../../config";
import IPathDTO from '../dto/IPathDTO';
import { Path } from "../domain/path";
import IPathRepo from '../services/IRepos/IPathRepo';
import IPathService from './IServices/IPathService';
import { Result } from "../core/logic/Result";
import { PathMap } from "../mappers/PathMap";


@Service()
export default class PathService implements IPathService {
  constructor(
      @Inject(config.repos.path.name) private pathRepo : IPathRepo
  ) {}

  public async getPath(pathId: string): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByDomainId(pathId);

      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      else {
        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>(pathDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {

      const pathOrError = await Path.create( pathDTO );

      if (pathOrError.isFailure) {
        return Result.fail<IPathDTO>(pathOrError.errorValue());
      }

      const pathResult = pathOrError.getValue();

      await this.pathRepo.save(pathResult);

      const pathDTOResult = PathMap.toDTO( pathResult ) as IPathDTO;
      return Result.ok<IPathDTO>( pathDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByDomainId(pathDTO.pathid);

      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      /* warehouseDestination:number;
    warehouseDeparture:number;
    distance: number;//in kms
    travelTime: number;//in minutes
    energyNecessary: number//in kwh
    additionalTime:number */
      else {
        path.warehouseDestination = pathDTO.warehouseDestination;
        path.warehouseDeparture=pathDTO.warehouseDeparture;
        path.distance=pathDTO.distance;
        path.travelTime=pathDTO.travelTime;
        path.energyNecessary=pathDTO.energyNecessary;
        path. additionalTime=pathDTO. additionalTime;
        await this.pathRepo.save(path);
        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>( pathDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
