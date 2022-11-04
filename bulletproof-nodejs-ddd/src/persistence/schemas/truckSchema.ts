import { ITruckPersistence } from "../../dataschema/ITruckPersistence";
import mongoose from 'mongoose';

/*  tare:number;
    maxWeight:number;
    batteryCapacity: number;//in kwh
    truckAutonomy: number;//in km
    chargeTime:number;//in minutes*/ 
const TruckSchema =new mongoose.Schema(
{ truckId: { 
    type: String,
    unique: true
  },
  tare: {
    type: Number
  },
  maxWeight: {
    type: Number
  },
  batteryCapacity: {
    type: Number
  },
  truckAutonomy: {
    type: Number
  },
  chargeTime: {
    type: Number
  },

})
  export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);



