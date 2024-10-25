import mongoose from "mongoose";

const WeatherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
}, { timestamps: true });

const WeatherModel = mongoose.model("WeatherData", WeatherSchema);

export default WeatherModel;