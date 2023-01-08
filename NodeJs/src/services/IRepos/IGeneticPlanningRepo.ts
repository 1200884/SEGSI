import { Repo } from "../../core/infra/Repo";
import { GeneticPlanning } from "../../domain/geneticplanning";

export default interface IGeneticPlanningRepo extends Repo<GeneticPlanning> {
  findByDomainId (date: string,geracoes:number,populacao:number,cruzamento:number,mutacao:number,termino:number): Promise<GeneticPlanning>;
}