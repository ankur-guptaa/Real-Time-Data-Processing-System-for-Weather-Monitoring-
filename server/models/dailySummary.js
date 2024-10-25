import mongoose from "mongoose";

const DailySummarySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avgTemp: {
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
    avgHumidity: {
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
    avgWindSpeed: {
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
    domWeatherCond: {
        type: String,
        required: true
    }
}, { timestamps: true });

const DailySummaryModel = mongoose.model("DailySummary", DailySummarySchema);

export default DailySummaryModel;