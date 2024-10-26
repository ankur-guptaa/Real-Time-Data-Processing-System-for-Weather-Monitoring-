import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = () => {
  const [cityList, setCityList] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [domWeather, setDomWeater] = useState(null);

  const getRules = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASEURL}/city_list`);
    setCityList(res.data);
  };

  useEffect(() => {
    getRules();
  }, []);

  const cityWeatherData = async () => {
    if (!currentCity) return;

    const res = await axios.post(
      `${import.meta.env.VITE_BASEURL}/city_weather_data`,
      { cityName: currentCity.cityData.name }
    );

    setCityData(res.data.weatherData);
    setDomWeater(res.data.domWeatherCond);
  };

  useEffect(() => {
    cityWeatherData();
  }, [currentCity]);

  return (
    <div className=" w-screen flex flex-col gap-8">
      <div className=" w-full flex flex-col mt-6 gap-2">
        <div className="w-full flex justify-center text-4xl font-bold">
          Application 2 - Real-Time Data Processing System for Weather
          Monitoring
        </div>
        <div className="w-full flex justify-center text-xl font-semibold">
          Weather Info
        </div>
      </div>
      <div className=" w-full flex justify-center gap-5">
        <div className="w-1/4 flex flex-col justify-center items-center">
          <div className=" w-full flex items-center justify-center text-xl font-semibold p-4">
            City List
          </div>
          <div className=" w-3/4  border border-gray-300 rounded-lg max-h-96 overflow-y-auto">
            {cityList.map((city) => {
              return (
                <div className=" w-full">
                  <div
                    className={` w-full flex justify-center border border-gray-300 p-2 ${
                      currentCity == city ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => {
                      setCurrentCity(city);
                    }}
                  >
                    {city.cityData.name}
                  </div>
                  <div>
                    <hr className=" w-full border border-gray-300"></hr>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className=" w-3/4 flex flex-col items-center gap-2">
          <div className=" w-3/4 flex items-center justify-center border border-gray-300 rounded-lg p-5 my-5 font-semibold">
            {currentCity
              ? currentCity.cityData.name
              : "Select any City from the List to see the Weather Info."}
          </div>
          <div className=" w-3/4 flex flex-col justify-center items-center gap-4 border border-gray-300 rounded-lg">
            <div className="">
              Average Temperature :-{" "}
              {cityData ? cityData.totTemp / cityData.totalObservations : ""}
            </div>
            <div className="">
              Maximum Temperature :- {cityData ? cityData.maxTemp : ""}
            </div>
            <div className="">
              Minimum Temperature :- {cityData ? cityData.minTemp : ""}
            </div>
            <div className="">
              Average Humidity :-{" "}
              {cityData
                ? cityData.totHumidity / cityData.totalObservations
                : ""}
            </div>
            <div className="">
              Maximum Humidity :- {cityData ? cityData.maxHumidity : ""}
            </div>
            <div className="">
              Minimum Humidity :- {cityData ? cityData.minHumidity : ""}
            </div>
            <div className="">
              Average Wind Speed :-{" "}
              {cityData
                ? cityData.totWindSpeed / cityData.totalObservations
                : ""}
            </div>
            <div className="">
              Maximum Wind Speed :- {cityData ? cityData.maxWindSpeed : ""}
            </div>
            <div className="">
              Minimum Wind Speed :- {cityData ? cityData.minWindSpeed : ""}
            </div>
            <div className="">
              Dominant Weather Condition :-{" "}
              {cityData && domWeather ? domWeather : ""}
            </div>
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default WeatherInfo;
