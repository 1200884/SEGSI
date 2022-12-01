import { Service, Inject } from 'typedi';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';

@Service()
export default class PlanningRepo implements IPlanningRepo {

  constructor() { }
  exists(t: Planning): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(t: Planning): Promise<Planning> {
    throw new Error('Method not implemented.');
  }

  public async findByDomainId(truckId: string, data: string): Promise<Planning> {

    var request = require('request');

    var obj = { truckId: truckId, date: data };

    request.post(
      'http://localhost:5000/planning',
      {json: obj},
      function (error, response, body) {
        console.log(obj);
        console.log("-----------------------------------------------------------");
        console.log(body);
        /*if (!error && response.statusCode == 200) {
          const planning = PlanningMap.toDomain(JSON.parse(body));
          console.log(planning);
        }else {
          console.log(error);
        }*/
      }
    );

    return null;
  }
}