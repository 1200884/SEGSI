import { Service, Inject } from 'typedi';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';

@Service()
export default class PlanningRepo implements IPlanningRepo {

  constructor() {}
  exists(t: Planning): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(t: Planning): Promise<Planning> {
    throw new Error('Method not implemented.');
  }

  public async findByDomainId (truckId: string, data: string): Promise<Planning> {

    const {resolve} = require('path');
    // 👇️ if using ES6 Modules syntax
    // import { resolve } from 'path';

    const absolutePath = resolve('../PROLOG/teste.txt');

    console.log(absolutePath);

    const http = require('http');

    http.get('http://localhost:5000/create_path?truck='+truckId+'&date='+data+'&path'+absolutePath, (resp) => {
      let data = '';
    
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(data);
        console.log("-----------------------------------------------------------");
        const fs = require('fs');

        fs.readFile('../PROLOG/teste.txt', 'utf8', (err, info) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(info);
          const planning = PlanningMap.toDomain(JSON.parse(info));
          console.log(planning);
        });
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    /*chamar o coiso ao prolog
    const query = { domainId: truckId};
    const planningRecord = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );

    if( planningRecord != null) {
      return PlanningMap.toDomain(planningRecord);
    }
    else
      return null;*/
      return null;
  }
}