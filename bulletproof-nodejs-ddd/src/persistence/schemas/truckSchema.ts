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
    type: Number,
    required: [true, 'Please enter tare'],
    index: true,
  },
  maxWeight: {
    type: Number,
    required: [true, 'Please enter max weight'],
    index: true,
  },
  batteryCapacity: {
    type: Number,
    required: [true, 'Please enter battery capacity'],
    index: true,
  },
  truckAutonomy: {
    type: Number,
    required: [true, 'Please enter truck autonomy'],
    index: true,
  },
  chargeTime: {
    type: Number,
    required: [true, 'Please enter charge time'],
    index: true,
  },

})
  export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);



