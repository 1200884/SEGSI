import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";

@Service()
export default class TruckService implements ITruckService {
  constructor(
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
  ) { }

  public async getTruck(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      const trucks = await this.truckRepo.findAll();
      var finalTrucks: Array<ITruckDTO> = [];

      if (trucks == null) {
        return Result.fail<ITruckDTO[]>("There was a problem assembling the trucks");
      }
      else {
        for (var i = 0; i < trucks.length; i++) {
          finalTrucks.push(TruckMap.toDTO(trucks[i]) as ITruckDTO);
        }
        return Result.ok<ITruckDTO[]>(finalTrucks)
      }
    } catch (e) {
      throw e;
    }
  }


  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {

      const truckOrError = await Truck.create(truckDTO);

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
      return Result.ok<ITruckDTO>(truckDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckDTO.id);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.tare = truckDTO.tare;
        truck.maxWeight = truckDTO.maxWeight;
        truck.batteryCapacity = truckDTO.batteryCapacity;
        truck.truckAutonomy = truckDTO.truckAutonomy;
        truck.chargeTime = truckDTO.chargeTime
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async patchTruck(truckInfo: string): Promise<Result<ITruckDTO>> {
    //"{"id":"adwdawd","tare":2,"max":5}"
    try {
      const info = truckInfo.split('"');
      let vars = [info[1]];
      let vals = [info[3]];
      let cont = true;
      let v1 = 5;
      let v2 = 6;
      do {
        if (info[v1] === undefined || info[v2] === undefined) {
          cont = false;
        } else {
          vars.push(info[v1]);
          vals.push(info[v2]);
        }
        v1 += 2;
        v2 += 2;
      } while (cont);
      const truck = await this.truckRepo.findByDomainId(vals[0]);
      let string;
      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        if (vars.includes("tare")) {
          //string = this.metodo(vals[vars.indexOf("tare")]);
          truck.tare = parseInt(await this.parse(vals[vars.indexOf("tare")]));
        }
        if (vars.includes("maxWeight")) {
          //string = this.metodo(vals[vars.indexOf("maxWeight")]);
          truck.maxWeight = parseInt(await this.parse(vals[vars.indexOf("maxWeight")]));
        }
        if (vars.includes("batteryCapacity")) {
          //string = this.metodo(vals[vars.indexOf("batteryCapacity")])
          truck.batteryCapacity = parseInt(await this.parse(vals[vars.indexOf("batteryCapacity")]));
        }
        if (vars.includes("truckAutonomy")) {
          //string = this.metodo(vals[vars.indexOf("truckAutonomy")]);
          truck.truckAutonomy = parseInt(await this.parse(vals[vars.indexOf("truckAutonomy")]));
        }
        if (vars.includes("chargeTime")) {
          //string = this.metodo(vals[vars.indexOf("chargeTime")]);
          truck.chargeTime = parseInt(await this.parse(vals[vars.indexOf("chargeTime")]));
        }
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async parse(string: string): Promise<string> {
    string = string.replace(',', '');
    string = string.replace(':', '');
    string = string.replace('}', '');
    return string;
  }
}
