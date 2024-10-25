import DailySummaryModel from "../models/dailySummary.js";
import TodayTotalModel from "../models/todayTotal.js";

const recordDailySummary = async () => {
    try {
        const todayInfo = await TodayTotalModel.find();

        todayInfo.forEach(async (info) => {
            const name = info.name;
            const avgTemp = info.totTemp / info.totalObservations, minTemp = info.minTemp, maxTemp = info.maxTemp;
            const avgHumidity = info.totHumidity / info.totalObservations, minHumidity = info.minHumidity, maxHumidity = info.maxHumidity;
            const avgWindSpeed = info.totWindSpeed / info.totalObservations, minWindSpeed = info.minWindSpeed, maxWindSpeed = info.maxWindSpeed;
            let domWeatherCond = null, maxcount = 0;

            for (const [cond, count] of info.weatherCond.entries()) {
                if (count > maxcount) {
                    maxcount = count;
                    domWeatherCond = cond;
                }
            }

            const newRecord = new DailySummaryModel({ name, avgTemp, maxTemp, minTemp, avgHumidity, maxHumidity, minHumidity, avgWindSpeed, maxWindSpeed, minWindSpeed, domWeatherCond });
            await newRecord.save();
        })

        await TodayTotalModel.deleteMany({});

        console.log("Today's summary has been recorded and TodayTotalModel has been deleted");
    }
    catch (error) {
        console.log(error.message);
    }
}

export default recordDailySummary;