import TodayTotalModel from "../models/todayTotal.js";

const cityWeatherData = async (req, res) => {
    const cityName = req.body.cityName;
    try {
        const weatherData = await TodayTotalModel.findOne({ name: cityName });
        res.send(weatherData);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

export default cityWeatherData;