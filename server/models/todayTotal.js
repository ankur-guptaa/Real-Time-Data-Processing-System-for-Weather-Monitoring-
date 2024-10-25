import mongoose from "mongoose";

const TodayTotalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totTemp: {
        type: Number,
        required: true
    },
    maxTemp: {
        type: Number,
        required: true
    },
    minTemp: {
        type: Number,
        required: true
    },
    totHumidity: {
        type: Number,
        required: true
    },
    maxHumidity: {
        type: Number,
        required: true
    },
    minHumidity: {
        type: Number,
        required: true
    },
    totWindSpeed: {
        type: Number,
        required: true
    },
    maxWindSpeed: {
        type: Number,
        required: true
    },
    minWindSpeed: {
        type: Number,
        required: true
    },
    weatherCond: {
        type: Map,
        of: Number,
        required: true
    },
    totalObservations: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const TodayTotalModel = new mongoose.model("TodayTotal", TodayTotalSchema);

export default TodayTotalModel;