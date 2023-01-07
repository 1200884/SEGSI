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

  public async findByDomainId(date: string,geracoes:string,populacao:string,cruzamento:string,mutacao:string): Promise<GeneticPlanning> {

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://localhost:5000/geneticlanning',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date": new Number(date),
        "geracoes":geracoes,
        "populacao":populacao,
        "cruzamento":cruzamento,
        "mutacao":mutacao
      })

    };
    let geneticplanning = null;

    function getPromise(options) {
      return new Promise((resolve, reject) => {
        request(options, function (error, response) {
          if (error) {
            reject(error);
          } else {
            console.log(response.body);
            
            geneticplanning = GeneticPlanningMap.toDomain(JSON.parse(response.body));
            resolve(geneticplanning);
          }
        })
      });
    }
 
    geneticplanning = getPromise(options);
    return geneticplanning;
  }
}