import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import axios from "axios";
import openWeatherAPI from "./controllers/openWeatherAPI.js";
import addCity from "./controllers/addCity.js";
import recordDailySummary from "./controllers/recordDailySummary.js";

const app = express();
app.use(express.json());

dotenv.config();
mongoose.connect(process.env.CONNECTMONGODB);

cron.schedule("0,5,10,15,20,25,30,35,40,45,50,55 * * * *", openWeatherAPI, { scheduled: true, timezone: "Asia/Kolkata" });
cron.schedule("30 56 23 * * *", recordDailySummary, { scheduled: true, timezone: "Asia/Kolkata" });

setInterval(async () => {
    const act = await axios.get("https://rule-engine-with-ast-zgt4.onrender.com/active");
    console.log(act.data);
}, 660000);

app.post("/add_city", addCity);
app.get("/active", (req, res) => { res.send("Acitvated") });


app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT + ".");
})