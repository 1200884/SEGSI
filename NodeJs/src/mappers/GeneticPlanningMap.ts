import { Mapper } from "../core/infra/Mapper";

import { GeneticPlanning } from "../domain/geneticplanning";
import IGeneticPlanningDTO from "../dto/IGeneticPlanningDTO";

export class GeneticPlanningMap extends Mapper<GeneticPlanning> {
  
  public static toDTO( geneticplanning: GeneticPlanning): IGeneticPlanningDTO {
    return {
      places: geneticplanning.places
    } as IGeneticPlanningDTO;
  }

  public static toDomain (geneticplanning: any): GeneticPlanning {
    const geneticplanningOrError = GeneticPlanning.create(
      geneticplanning
    );

    geneticplanningOrError.isFailure ? console.log(geneticplanningOrError.error) : '';

    return geneticplanningOrError.isSuccess ? geneticplanningOrError.getValue() : null;
  }

  public static toPersistence (geneticplanning: GeneticPlanning): any {
    return {
    
      places: geneticplanning.places
    }
  }
}