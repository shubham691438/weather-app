const router = require('express').Router();
const { getWeatherSummaryByDateAndCity,getLatestWeatherByCity,getWeatherSummaryForLastDays } = require('../controllers/weatherController');

router.get('/weatherSummary/:city/:date', getWeatherSummaryByDateAndCity);
router.get('/latestWeather/:city', getLatestWeatherByCity);
router.get('/weatherSummaryHistory/:city/:days', getWeatherSummaryForLastDays);

module.exports = router;
