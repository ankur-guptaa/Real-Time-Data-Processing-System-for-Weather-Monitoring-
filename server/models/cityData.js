import mongoose from "mongoose";

const CitySchmea = new mongoose.Schema({
    cityData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

const CityModel = new mongoose.model("CityData", CitySchmea);

export default CityModel;