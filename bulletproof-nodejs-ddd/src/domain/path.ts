import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import {PathId} from"./pathId";
import { Result } from "../core/logic/Result";
import IPathDto from "../dto/IPathDTO";
import { Guard } from "../core/logic/Guard";

interface PathProps {
    warehouseDestination:number;//warehouse id, 1 -> 17
    warehouseDeparture:number;//warehouse id, 1 -> 17
    distance: number;//in kms
    travelTime: number;//in minutes
    energyNecessary: number//in kwh
    additionalTime:number //this parameter is solely considered if a truck needs to be charged along the way
 }
 export class Path extends AggregateRoot<PathProps> {
    get id (): UniqueEntityID {
        return this._id;
      }
      get pathId (): PathId {
        return PathId.caller(this.id)
      }
      get warehouseDestination (): number {
        return this.props.warehouseDestination;
      }
    
      get warehouseDeparture (): number {
        return this.props.warehouseDestination
      }
    
      get distance (): number {
        return this.props.distance;
      }
    
      get travelTime (): number {
        return this.props.travelTime;
      }
    
      get energyNecessary (): number {
        return this.props.energyNecessary;
      }
      get additionalTime (): number {
        return this.props.additionalTime;
      }
      
      set warehouseDestination (value: number) {
          this.props.warehouseDestination = value;
      } 

      set warehouseDeparture (value: number) {
        this.props.warehouseDeparture = value;
      }
        set distance(value: number){
          this.props.distance=value;
        }
        set travelTime(value: number){
          this.props.travelTime=value;
        }
        set energyNecessary(value: number){
          this.props.energyNecessary=value;
        }
        set additionalTime(value:number){
          this.props.additionalTime=value;
        }
        
    private constructor (props: PathProps, id?: UniqueEntityID) {
        super(props, id);
    }

      public static create (props: PathProps, id?: UniqueEntityID): Result<Path> {

        const guardedProps = [
          { argument: props.warehouseDestination, argumentName: 'warehouseDestination' },
          { argument: props.warehouseDeparture, argumentName: 'warehouseDeparture' },
          { argument: props.distance, argumentName: 'distance' },
          { argument: props.travelTime, argumentName: 'travelTime' },
          { argument: props.energyNecessary, argumentName: 'energyNecessary' },
          { argument: props.additionalTime, argumentName: 'additionalTime' }
        ];
    
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
        if (!guardResult.succeeded) {
          return Result.fail<Path>(guardResult.message)
        }     
        else {
          const path = new Path({
            ...props
          }, id);
    
          return Result.ok<Path>(path);
        }
      }
      
    }