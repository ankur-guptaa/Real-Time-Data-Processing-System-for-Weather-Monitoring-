import axios from "axios";
import CityModel from "../models/cityData.js";

const addCity = async (req, res) => {
    try {
        const cityName = req.body.cityName, countryCode = req.body.countryCode;

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${process.env.API_KEY}`;
        const cityInfo = await axios.get(url);

        if (!cityInfo.data[0])
            throw new Error("Information about this city is not available.");

        const city = await CityModel.findOne({ "cityData.name": cityInfo.data[0].name });
        if (city)
            throw new Error("City already exist in the Database.");

        const newCityData = new CityModel({ cityData: cityInfo.data[0] });
        newCityData.save();

        console.log("New City has been added.");
        res.send(cityInfo.data[0]);
    }
    catch (error) {
        res.send(error.message);
    }
}

export default addCity;