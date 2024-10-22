const router = require('express').Router();
const { getBreachesForLast7Days,getWeatherSummaryByDateAndCity,getLatestWeatherByCity,getWeatherSummaryForLastDays } = require('../controllers/weatherController');

router.get('/weatherSummary/:city/:date', getWeatherSummaryByDateAndCity);
router.get('/latestWeather/:city', getLatestWeatherByCity);
router.get('/weatherSummaryHistory/:city/:days', getWeatherSummaryForLastDays);
router.get('/thresholdBreaches/:userId', getBreachesForLast7Days);


module.exports = router;
