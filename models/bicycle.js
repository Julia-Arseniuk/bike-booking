import { ObjectId } from "bson";
import mongoose from "mongoose";

const {Schema} = mongoose;

const bikeSchema = new Schema ({
    id: {
        type: String,
        required: true,
        // unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
            type: String,
            required: true
    },
    color: {
        type: String,
        required: true
    },
    wheelSize: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        value: {
            type: String,
            default: 'available'
        },
        label: {
            type: String,
            default: 'Available'
        }
    }
});

export default mongoose.model('Bike', bikeSchema);