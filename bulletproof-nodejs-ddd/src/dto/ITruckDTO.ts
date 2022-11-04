export default interface ITruckDTO {
    truckid:string;
    tare:number;
    maxWeight:number;
    batteryCapacity: number;//in kwh
    truckAutonomy: number;//in km
    chargeTime:number;//in 
}