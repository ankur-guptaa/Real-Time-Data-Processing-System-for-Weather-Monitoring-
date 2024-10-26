import TodayTotalModel from "../models/todayTotal.js";

const cityWeatherData = async (req, res) => {
    try {
        const cityName = req.body.cityName;
        const weatherData = await TodayTotalModel.findOne({ name: cityName });

        let domWeatherCond = null, maxcount = 0;
        for (const [cond, count] of weatherData.weatherCond.entries()) {
            if (count > maxcount) {
                maxcount = count;
                domWeatherCond = cond;
            }
        }

        res.send({ weatherData, domWeatherCond });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

export default cityWeatherData;