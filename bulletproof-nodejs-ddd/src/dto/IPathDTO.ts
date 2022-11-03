export default interface IPathDTO{
    pathid:string;
    warehouseDestination:number;
    warehouseDeparture:number;
    distance: number;//in kms
    travelTime: number;//in minutes
    energyNecessary: number//in kwh
    additionalTime:number;
}