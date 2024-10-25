import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import openWeatherAPI from "./controllers/openWeatherAPI.js";
import addCity from "./controllers/addCity.js";
import recordDailySummary from "./controllers/recordDailySummary.js";

const app = express();
app.use(express.json());

dotenv.config();
mongoose.connect(process.env.CONNECTMONGODB);

cron.schedule("0,5,10,15,20,25,30,35,40,45,50,55 * * * *", openWeatherAPI, { scheduled: true, timezone: "Asia/Kolkata" });
cron.schedule("30 56 23 * * *", recordDailySummary, { scheduled: true, timezone: "Asia/Kolkata" });
// // openWeatherAPI();
// recordDailySummary();

app.post("/add_city", addCity);


app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT + ".");
})