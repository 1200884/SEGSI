import { Service, Inject } from 'typedi';

import IGeneticPlanningRepo from '../services/IRepos/IGeneticPlanningRepo';
import { GeneticPlanning } from '../domain/geneticplanning';
import { GeneticPlanningMap } from '../mappers/GeneticPlanningMap';
import { callbackify } from 'util';
import { reject } from 'lodash';

@Service()
export default class GeneticPlanningRepo implements IGeneticPlanningRepo {

  constructor() { }
    save(t: GeneticPlanning): Promise<GeneticPlanning> {
        throw new Error('Method not implemented.');
    }
  exists(t: GeneticPlanning): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
 /* save(t: GeneticPlanning): Promise<GeneticPlanning> {
    throw new Error('Method not implemented.');
  }*/

  public async findByDomainId(date: number,nrgeracoes:number,tamanhopop:number,probcruzamento:number,probmutacao:number): Promise<String> {

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://localhost:5000/geneticplanning',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date": date,
        "nrgeracoes":nrgeracoes,
        "tamanhopop":tamanhopop,
        "probcruzamento":probcruzamento,
        "probmutacao":probmutacao,
      })

    };
    let geneticplanning = null;

    function getPromise(options) {
      return new Promise((resolve, reject) => {
        request(options, function (error, response) {
          if (error) {
            reject(error);
          } else {
            console.log("response body is"+response.body);
            geneticplanning =response.body;
            resolve(geneticplanning);
           return response.body;
          }
        })
      });
    }
 
    geneticplanning = getPromise(options);
    console.log("geneticc planing is "+geneticplanning);
    return geneticplanning;
  }
}