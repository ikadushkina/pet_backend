const PORT = process.env.PORT || 8000;
const LIFE_TIME_ACCESS = process.env.ACCESS_TOKEN_LIFE || "15m";
const LIFE_TIME_REFRESH = process.env.REFRESH_TOKEN_LIFE || "1d";

module.exports = {
  PORT,
  LIFE_TIME_ACCESS,
  LIFE_TIME_REFRESH
}
