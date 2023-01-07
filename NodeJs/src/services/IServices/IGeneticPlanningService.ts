import { Result } from "../../core/logic/Result";
import IGeneticPlanningDTO from "../../dto/IGeneticPlanningDTO";

export default interface IGeneticPlanningService  {
  getGeneticPlanning (date: string,geracoes:string,populacao:string,cruzamento:string,mutacao:string): Promise<Result<IGeneticPlanningDTO>>;
}
