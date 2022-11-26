import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";
import IPlanningService from './IServices/IPlanningService';
import IPlanningDTO from '../dto/IPlanningDTO';
import { PlanningMap } from '../mappers/PlanningMap';

@Service()
export default class PlanningService implements IPlanningService {
  constructor(
    @Inject(config.repos.planning.name) private planningRepo: IPlanningRepo
  ) { }

  public async getPlanning(truckId: string, date: string): Promise<Result<IPlanningDTO>> {
    try {
      const planning = await this.planningRepo.findByDomainId(truckId);

      if (planning === null) {
        return Result.fail<IPlanningDTO>("Planning not found");
      }
      else {
        const planningDTOResult = PlanningMap.toDTO(planning) as IPlanningDTO;
        return Result.ok<IPlanningDTO>(planningDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }
}
