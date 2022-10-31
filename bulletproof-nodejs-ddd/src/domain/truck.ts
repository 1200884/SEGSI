import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import {TruckId} from "./truckId";
import { Result } from "../core/logic/Result";
import ITruckDto from "../dto/ITruckDTO";
import { Guard } from "../core/logic/Guard";

interface TruckProps {
    tare:number;
    maxWeight:number;
    batteryCapacity: number;//in kwh
    truckAutonomy: number;//in km
    chargeTime:number;//in 
}
    export class Truck extends AggregateRoot<TruckProps> {
        get id (): UniqueEntityID {
            return this._id;
          }
          get truckId (): TruckId {
            return TruckId.caller(this.id)
          }
          get tare (): number {
            return this.props.tare;
          }
        
          get maxWeight (): number {
            return this.props.maxWeight
          }
        
          get batteryCapacity (): number {
            return this.props.batteryCapacity;
          }
        
          get truckAutonomy (): number {
            return this.props.truckAutonomy;
          }
          
          get chargeTime (): number {
            return this.props.chargeTime;
          }
          set batteryCapacity (value:number){
            this.props.batteryCapacity=value;
          }
          set tare (value:number){
            this.props.tare=value;
          }
          set maxWeight(value:number){
            this.props.maxWeight=value;
          }
          private constructor (props: TruckProps, id?: UniqueEntityID) {
            super(props, id);
        }
          public static create (props: TruckProps, id?: UniqueEntityID): Result<Truck> {

            const guardedProps = [
              { argument: props.tare, argumentName: 'tare' },
              { argument: props.maxWeight, argumentName: 'maxWeight' },
              { argument: props.batteryCapacity, argumentName: 'batteryCapacity' },
              { argument: props.truckAutonomy, argumentName: 'truckAutonomy' },
              { argument: props.chargeTime, argumentName: 'chargeTime' },
            ];
            const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
            if (!guardResult.succeeded) {
              return Result.fail<Truck>(guardResult.message)
            }     
            else {
              const path = new Truck({
                ...props
              }, id);
        
              return Result.ok<Truck>(path);
            }
        }
    }