export default interface ITruckDTO {
    truckId:string;
    tare:number;
    maxWeight:number;
    batteryCapacity: number;//in kwh
    truckAutonomy: number;//in km
    chargeTime:number
}