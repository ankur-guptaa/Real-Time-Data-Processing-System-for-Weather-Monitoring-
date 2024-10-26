import axios from "axios";
import { useState } from "react";

const AddCity = () => {
  const [cityName, setCityName] = useState(null);
  const [countryCode, setCountryCode] = useState(null);

  return (
    <div className=" w-screen flex flex-col gap-24">
      <div className=" w-full flex flex-col mt-6 gap-2">
        <div className="w-full flex justify-center text-4xl font-bold">
          Application 2 - Real-Time Data Processing System for Weather
          Monitoring
        </div>
        <div className="w-full flex justify-center text-xl font-semibold">
          Add City
        </div>
      </div>
      <div className=" w-full flex flex-col justify-center items-center gap-10">
        <div className=" w-full flex justify-center items-center gap-4">
          <div>Enter City Name</div>
          <input
            placeholder="Eg. Hyderabad"
            className=" w-1/4 border border-gray-500 rounded-lg p-4"
            onChange={(e) => {
              setCityName(e.target.value);
            }}
          ></input>
        </div>
        <div className=" w-full flex justify-center items-center gap-4">
          <div>Enter Country Code</div>
          <input
            placeholder="Eg. 91"
            className=" w-1/4 border border-gray-500 rounded-lg p-4"
            onChange={(e) => {
              setCountryCode(e.target.value);
            }}
          ></input>
        </div>
        <button
          className=" w-1/6 border border-gray-300 rounded-lg bg-blue-500 text-white text-xl p-4"
          onClick={async () => {
            try {
              const res = await axios.post(
                `${import.meta.env.VITE_BASEURL}/add_city`,
                { cityName, countryCode }
              );
              alert(res.data);
            } catch (error) {
              alert(error.message);
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCity;
