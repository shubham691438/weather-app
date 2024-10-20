const router = require('express').Router();
const { getWeatherSummaryByDateAndCity,getLatestWeatherByCity } = require('../controllers/weatherController');

router.get('/weatherSummary/:city/:date', getWeatherSummaryByDateAndCity);
router.get('/latestWeather/:city', getLatestWeatherByCity);

module.exports = router;
