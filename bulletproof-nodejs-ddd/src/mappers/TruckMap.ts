
import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Truck} from "../domain/truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import ITruckDTO from "../dto/ITruckDTO";
export class TruckMap extends Mapper<Truck> {
  
    /*truckid:string;
    tare: number;
    maxWeight: number;
    batteryCapacity: number;
    truckAutonomy: number;
    chargeTime:number;*/
    public static toDTO( truck: Truck): ITruckDTO {
      return {
          truckid: truck.id.toString(),
          tare: truck.tare,
          maxWeight: truck.maxWeight,
          batteryCapacity: truck.batteryCapacity,
          truckAutonomy: truck.truckAutonomy,
          chargeTime: truck.chargeTime
      }  as ITruckDTO;
    }
    public static async toDomain (raw: any): Promise<Truck> {
        const truckOrError = Truck.create({
    
          tare: raw.tare,
          maxWeight: raw.maxWeight,
          batteryCapacity: raw.batteryCapacity,
          truckAutonomy: raw.truckAutonomy,
          chargeTime: raw.chargeTime
        }, new UniqueEntityID(raw.truckid))
    
        truckOrError.isFailure ? console.log(truckOrError.error) : '';
        
        return truckOrError.isSuccess ? truckOrError.getValue() : null;
      }
  
    public static toPersistence (truck: Truck): any {
      const truckpersistence= {
        truckid: truck.id.toString(),
        tare: truck.tare,
        maxWeight: truck.maxWeight,
        batteryCapacity: truck.batteryCapacity,
        truckAutonomy: truck.truckAutonomy,
        chargeTime: truck.chargeTime
      }
      return truckpersistence;
    }
  }