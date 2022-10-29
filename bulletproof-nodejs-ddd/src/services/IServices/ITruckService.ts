import { Result } from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";

//In accordance with the Lvl 3 Logical View developed, as it uses DTO instances as it can be seen below, are used in the services class, consuming, as such, the DTO class functionalities.
export default interface ITruckService  {
  createTruck(TruckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(TruckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
listTruck();
  getTruck (truckId: string): Promise<Result<ITruckDTO>>;
}
