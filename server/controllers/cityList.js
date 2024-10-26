import CityModel from "../models/cityData.js";

const cityList = async (req, res) => {
    try {
        const cities = await CityModel.find();
        res.send(cities);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

export default cityList;