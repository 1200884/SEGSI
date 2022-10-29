import IPathDTO from "../dto/IPathDTO";
import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';
import { Path} from "../domain/path";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import path from "path";

export class PathMap extends Mapper<Path> {
  
    /* pathid:string;
    warehouseDestination:string;
    warehouseDeparture:string;
    distance: number;//in kms
    travelTime: number;//in minutes
    energyNecessary: number//in kwh
    additionalTime:number;*/
    public static toDTO( path: Path): IPathDTO {
      return {
        pathid:path.id.toString(),
        warehouseDestination: path.warehouseDestination,
        warehouseDeparture:path.warehouseDeparture,
        distance: path.distance,
        travelTime: path.travelTime,
        energyNecessary: path.energyNecessary,
        additionalTime:path.additionalTime
      }  as IPathDTO;
    }
    public static async toDomain (raw: any): Promise<Path> {
        const pathOrError = Path.create({
            warehouseDestination: raw.warehouseDestination,
            warehouseDeparture:raw.warehouseDeparture,
            distance: raw.distance,
            travelTime: raw.travelTime,
            energyNecessary: raw.energyNecessary,
            additionalTime:raw.additionalTime
        }, new UniqueEntityID(raw.pathid))
    
        pathOrError.isFailure ? console.log(pathOrError.error) : '';
        
        return pathOrError.isSuccess ? pathOrError.getValue() : null;
      }
  
    public static toPersistence (path: Path): any {
      const pathpersistence= {
        pathid:path.id.toString(),
        warehouseDestination: path.warehouseDestination,
        warehouseDeparture:path.warehouseDeparture,
        distance: path.distance,
        travelTime: path.travelTime,
        energyNecessary: path.energyNecessary,
        additionalTime:path.additionalTime
      }
      return pathpersistence;
    }
  }