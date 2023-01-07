import { AggregateRoot } from "../core/domain/AggregateRoot";

import { Result } from "../core/logic/Result";

import IGeneticPlanningDTO from "../dto/IGeneticPlanningDTO";

interface GeneticPlanningProps {
    places: [string];
}

export class GeneticPlanning extends AggregateRoot<GeneticPlanningProps> {

 get places (): [string] {
    return this.props.places;
  }

  set places ( value: [string]) {
    this.props.places = value;
  }

  private constructor (props: GeneticPlanningProps) {
    super(props);
  }

  public static create (geneticplanningDTO: IGeneticPlanningDTO): Result<GeneticPlanning> {
    
    const places = geneticplanningDTO.places;


      const geneticplanning = new GeneticPlanning({places: places});
      return Result.ok<GeneticPlanning>( geneticplanning )
    }
  }

