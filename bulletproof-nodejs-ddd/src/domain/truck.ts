import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TruckId } from "./truckId";

import ITruckDTO from "../dto/ITruckDTO";

interface TruckProps {
    tare: number;
    maxWeight: number;
    batteryCapacity: number;
    truckAutonomy: number;
    chargeTime: number;
}

export class Truck extends AggregateRoot<TruckProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get truckId (): TruckId {
    return new TruckId(this.truckId.toValue());
  }

  get tare (): number {
    return this.props.tare;
  }
  
  set tare ( value: number) {
    this.props.tare = value;
  }
  
  get maxWeight (): number {
    return this.props.maxWeight;
  }

  set maxWeight ( value: number) {
    this.props.maxWeight = value;
  }

  get batteryCapacity (): number {
    return this.props.batteryCapacity;
  }

  set batteryCapacity ( value: number) {
    this.props.batteryCapacity = value;
  }

  get truckAutonomy (): number {
    return this.props.truckAutonomy;
  }

  set truckAutonomy ( value: number) {
    this.props.truckAutonomy = value;
  }

  get chargeTime (): number {
    return this.props.chargeTime;
  }

  set chargeTime( value: number) {
    this.props.chargeTime = value;
  }

  private constructor (props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    const tare = truckDTO.tare;
    const maxWeight = truckDTO.maxWeight;
    const batteryCapacity = truckDTO.batteryCapacity;
    const truckAutonomy = truckDTO.truckAutonomy;
    const chargeTime = truckDTO.chargeTime;

    if (tare < 0 || maxWeight < 0 || batteryCapacity < 0 || truckAutonomy < 0 || chargeTime < 0) {
      return Result.fail<Truck>('Must provide positive data')
    } else {
      const truck = new Truck({ tare: tare, maxWeight: maxWeight, batteryCapacity: batteryCapacity, truckAutonomy: truckAutonomy, chargeTime: chargeTime }, id);
      return Result.ok<Truck>( truck )
    }
  }
}
