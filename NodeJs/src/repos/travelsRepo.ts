import { Service, Inject } from 'typedi';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';
import { callbackify } from 'util';
import { reject } from 'lodash';
import { Travels } from '../domain/travels';
import ITravelsRepo from '../services/IRepos/ITravelsRepo';
import { TravelsMap } from '../mappers/TravelsMap';
import { ITravelsPersistence } from '../dataschema/ITravelsPersistence';
import { Document, Model } from 'mongoose';

@Service()
export default class TravelsRepo implements ITravelsRepo {

  constructor(
    @Inject('travelsSchema') private travelsSchema: Model<ITravelsPersistence & Document>,) { }
  exists(t: Travels): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async generateTravels(data: string): Promise<Travels> {

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://vs136.dei.isep.ipp.pt:5000/travels',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date": new Number(data)
      })

    };
    let travels = null;

    function getPromise(options) {
      return new Promise((resolve, reject) => {
        request(options, function (error, response) {
          if (error) {
            reject(error);
          } else {
            console.log(response.body);
            
            travels = TravelsMap.toDomain(JSON.parse(response.body));
            resolve(travels);
          }
        })
      });
    }
 
    travels = getPromise(options);
    return travels;
  }

  public async save(travels: Travels): Promise<Travels> {
    const query = { domainId: travels.id.toString() };

    const travelsDocument = await this.travelsSchema.findOne(query);

    try {
      if (travelsDocument === null) {
        const rawTravels: any = TravelsMap.toPersistence(travels);

        console.log(rawTravels);
        const travelsCreated = await this.travelsSchema.create(rawTravels);

        return TravelsMap.toDomain(travelsCreated);
      } else {
        travelsDocument.trucks = travels.trucks;
        travelsDocument.deliveries = travels.deliveries;
        await travelsDocument.save();

        return travels;
      }
    } catch (err) {
      throw err;
    }
  }
}