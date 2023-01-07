import { Repo } from "../../core/infra/Repo";
import { GeneticPlanning } from "../../domain/geneticplanning";

export default interface IGeneticPlanningRepo extends Repo<GeneticPlanning> {
  findByDomainId (date: string,geracoes:string,populacao:string,cruzamento:string,mutacao:string): Promise<GeneticPlanning>;
}