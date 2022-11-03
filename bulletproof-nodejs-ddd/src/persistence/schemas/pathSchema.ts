import { IPathPersistence } from "../../dataschema/IPathPersistence";
import mongoose from 'mongoose';

/*  warehouseDestination:number;//warehouse id, 1 -> 17
    warehouseDeparture:number;//warehouse id, 1 -> 17
    distance: number;//in kms
    travelTime: number;//in minutes
    energyNecessary: number//in kwh
    additionalTime:number //this parameter is solely considered if a truck needs to be charged along the way*/ 
const PathSchema =new mongoose.Schema(
{ pathId: { 
    type: String,
    unique: true
  },
  warehouseDestination: {
    type: Number,
    unique: true
  },
  warehouseDeparture: {
    type: Number,
    unique: true
  },
  distance: {
    type: Number,
    required: [true, 'Please enter distance'],
    index: true,
  },
  travelTime: {
    type: Number,
    required: [true, 'Please enter distance'],
    index: true,
  },
  energyNecessary: {
    type: Number,
    required: [true, 'Please enter distance'],
    index: true,
  },
  additionalTime:{
    type: Number,
    required: [true, 'Please enter additionalTime'],
    index: true,
  }
})
  export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);



