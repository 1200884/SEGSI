import mongoose from 'mongoose';
import { ITravelsPersistence } from '../../dataschema/ITravelsPersistence';

const TravelsSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        trucks: { type: [String], unique: false },
        deliveries: { type: [[Number]], unique: false }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITravelsPersistence & mongoose.Document>('Travels', TravelsSchema);
