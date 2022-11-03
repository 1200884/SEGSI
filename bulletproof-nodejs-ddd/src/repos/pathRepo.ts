import { Service, Inject } from 'typedi';

import IPathRepo from "../services/IRepos/IPathRepo";
import { Path } from "../domain/path";
import {PathId } from "../domain/pathId";
import { PathMap } from "../mappers/PathMap";
import { Document, FilterQuery, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

@Service()
export default class PathRepo implements IPathRepo {
  private models: any;

  constructor(
    @Inject('pathSchema') private pathSchema : Model<IPathPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(path: Path): Promise<boolean> {
    
    const idX = path.id instanceof PathId ? (<PathId>path.id).toValue() : path.id;

    const query = { domainId: idX}; 
    const pathDocument = await this.pathSchema.findOne( query as FilterQuery<IPathPersistence & Document>);

    return !!pathDocument === true;
  }

  public async save (path:Path): Promise<Path> {
    const query = { domainId: path.id.toString()}; 

    const pathDocument = await this.pathSchema.findOne( query );
/*  warehouseDestination:number;
    warehouseDeparture:number;
    distance: number;//in kms
    travelTime: number;//in minutes
    energyNecessary: number//in kwh
    additionalTime:number */ 
    try {
      if (pathDocument === null ) {
        const rawPath: any = PathMap.toPersistence(path);
        
        const pathCreated = await this.pathSchema.create(rawPath);

        return PathMap.toDomain(pathCreated);
      } else {
        pathDocument.warehouseDestination = path. warehouseDestination;
        pathDocument. warehouseDeparture = path.warehouseDeparture;
        pathDocument.distance = path.distance;
        pathDocument.travelTime = path.travelTime;
        pathDocument.energyNecessary = path.energyNecessary;
        pathDocument.additionalTime = path.additionalTime;
        await pathDocument.save();

        return path;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (pathId: PathId | string): Promise<Path> {
    const query = { domainId: pathId};
    const pathRecord = await this.pathSchema.findOne( query as FilterQuery<IPathPersistence & Document> );

    if( pathRecord != null) {
      return PathMap.toDomain(pathRecord);
    }
    else
      return null;
  }
}