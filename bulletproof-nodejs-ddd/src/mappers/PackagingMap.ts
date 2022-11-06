import IPackagingDTO from "../dto/IPackagingDTO";
import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';
import { Packaging} from "../domain/packaging";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import path from "packaging";
//Packaging packaging
export class PackagingMap extends Mapper<Packaging> {
  
    /* packagingId: number;
    boxId: number;
    positionX : number;
    positionY : number;
    positionZ : number;*/
    public static toDTO( path: Packaging): IPackagingDTO {
      return {
        packagingid:packaging.id.toString(),
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