import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AddCity from "./pages/addCity.jsx";
import WeatherInfo from "./pages/WeatherInfo.jsx";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <div className=" w-screen bg-blue-600 text-white flex gap-16 p-4">
        <button
          onClick={() => {
            navigate("/add_city");
          }}
        >
          Add New City
        </button>
        <button
          onClick={() => {
            navigate("/weather_info");
          }}
        >
          Weather Info
        </button>
        {/* <button
          onClick={() => {
          }}
        >
          Evaluate Rule
        </button> */}
      </div>
      <Routes>
        <Route
          path="/*"
          element={<Navigate to="/weather_info"></Navigate>}
        ></Route>
        <Route path="/add_city" element={<AddCity />}></Route>
        <Route path="/weather_info" element={<WeatherInfo />}></Route>
        {/* <Route path="/evaluate_rule" element={<EvaluateRule />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
