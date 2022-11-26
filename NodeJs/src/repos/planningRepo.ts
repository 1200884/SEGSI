import { Service, Inject } from 'typedi';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/truck";
import { TruckId } from "../domain/truckId";
import { TruckMap } from "../mappers/TruckMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import ITruckDTO from '../dto/ITruckDTO';
import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';

@Service()
export default class PlanningRepo implements IPlanningRepo {

  constructor() {}

  public async findByDomainId (truckId: string, data: string): Promise<Planning> {
    /*chamar o coiso ao prolog
    const query = { domainId: truckId};
    const planningRecord = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );

    if( planningRecord != null) {
      return PlanningMap.toDomain(planningRecord);
    }
    else
      return null;*/
  }
}