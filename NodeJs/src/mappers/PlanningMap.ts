import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckDTO from "../dto/ITruckDTO";
import { Truck } from "../domain/truck";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Planning } from "../domain/planning";
import IPlanningDTO from "../dto/IPlanningDTO";

export class PlanningMap extends Mapper<Planning> {
  
  public static toDTO( planning: Planning): IPlanningDTO {
    return {
      time: planning.time
    } as IPlanningDTO;
  }

  public static toDomain (planning: any): Planning {
    const planningOrError = Planning.create(
      planning
    );

    planningOrError.isFailure ? console.log(planningOrError.error) : '';

    return planningOrError.isSuccess ? planningOrError.getValue() : null;
  }

  public static toPersistence (planning: Planning): any {
    return {
      time: planning.time
    }
  }
}