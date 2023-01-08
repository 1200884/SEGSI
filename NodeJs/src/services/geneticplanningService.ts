import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IGeneticPlanningService from './IServices/IGeneticPlanningService';
import IGeneticPlanningDTO from '../dto/IGeneticPlanningDTO';
import { GeneticPlanningMap } from '../mappers/GeneticPlanningMap';
import IGeneticPlanningRepo from './IRepos/IGeneticPlanningRepo';
//import IDeliveryRepo from './IRepos/IDeliveryRepo';

@Service()
export default class GeneticPlanningService implements IGeneticPlanningService {
  constructor(
    @Inject(config.repos.geneticplanning.name) private geneticplanningRepo: IGeneticPlanningRepo,
    //@Inject(config.repos.delivery.name) private deliveryRepo: IDeliveryRepo
  ) { }

  public async getGeneticPlanning(date: string,geracoes:string,populacao:string,cruzamento:string,mutacao:string): Promise<Result<IGeneticPlanningDTO>> {
    try {

      //const deliveries = await this.deliveryRepo.findAll();

      const geneticplanning = await this.geneticplanningRepo.findByDomainId(date,geracoes,populacao,cruzamento,mutacao);

      if (geneticplanning === null) {
        return Result.fail<IGeneticPlanningDTO>("Planning not found");
      }
      else {
        const geneticplanningDTOResult = GeneticPlanningMap.toDTO(geneticplanning) as IGeneticPlanningDTO;
        return Result.ok<IGeneticPlanningDTO>(geneticplanningDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }
}