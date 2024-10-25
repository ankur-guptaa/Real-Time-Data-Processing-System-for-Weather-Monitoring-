import axios from "axios";
import CityModel from "../models/cityData.js";
import TodayTotalModel from "../models/todayTotal.js";
import WeatherModel from "../models/weatherData.js";

const openWeatherAPI = async () => {
    try {
        const allCities = await CityModel.find();

        allCities.forEach(async (city) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.cityData.lat}&lon=${city.cityData.lon}&appid=${process.env.API_KEY}`
            const weatherInfo = await axios.get(url);

            const weath_data = new WeatherModel({ name: city.cityData.name, data: weatherInfo.data });
            await weath_data.save();

            const oldTodayTotal = await TodayTotalModel.findOne({ name: city.cityData.name });
            if (oldTodayTotal) {
                const name = oldTodayTotal.name;
                const totTemp = oldTodayTotal.totTemp + weatherInfo.data.main.temp - 273.15;
                const minTemp = Math.min(oldTodayTotal.minTemp, weatherInfo.data.main.temp - 273.15), maxTemp = Math.max(oldTodayTotal.maxTemp, weatherInfo.data.main.temp - 273.15);
                const totHumidity = oldTodayTotal.totHumidity + weatherInfo.data.main.humidity;
                const minHumidity = Math.min(oldTodayTotal.minHumidity, weatherInfo.data.main.humidity), maxHumidity = Math.max(oldTodayTotal.maxHumidity, weatherInfo.data.main.humidity);
                const totWindSpeed = oldTodayTotal.totWindSpeed + weatherInfo.data.wind.speed;
                const minWindSpeed = Math.min(oldTodayTotal.minWindSpeed, weatherInfo.data.wind.speed), maxWindSpeed = Math.max(oldTodayTotal.maxWindSpeed, weatherInfo.data.wind.speed);
                const totalObservations = oldTodayTotal.totalObservations + 1;
                const weatherCond = oldTodayTotal.weatherCond;
                weatherCond.set(weatherInfo.data.weather[0].main, weatherCond.get(weatherInfo.data.weather[0].main) + 1)

                await TodayTotalModel.updateOne({ name }, { $set: { totTemp, minTemp, maxTemp, totHumidity, minHumidity, maxHumidity, totWindSpeed, minWindSpeed, maxWindSpeed, totalObservations, weatherCond } });
            }
            else {
                const name = city.cityData.name;
                const totTemp = weatherInfo.data.main.temp - 273.15;
                const minTemp = totTemp, maxTemp = totTemp;
                const totHumidity = weatherInfo.data.main.humidity;
                const minHumidity = totHumidity, maxHumidity = totHumidity;
                const totWindSpeed = weatherInfo.data.wind.speed;
                const minWindSpeed = totWindSpeed, maxWindSpeed = totWindSpeed;
                const totalObservations = 1;
                const weatherCond = new Map();
                weatherCond.set(weatherInfo.data.weather[0].main, 1);

                const newTodayTotal = new TodayTotalModel({ name, totTemp, minTemp, maxTemp, totHumidity, minHumidity, maxHumidity, totWindSpeed, minWindSpeed, maxWindSpeed, totalObservations, weatherCond });
                await newTodayTotal.save();
            }
        })

        console.log("Data has been Recorded.");
    }
    catch (error) {
        console.log(error.message);
    }
}

export default openWeatherAPI;