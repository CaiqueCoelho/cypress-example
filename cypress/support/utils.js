export const calculatePercentage = (totalSeriesValues, seriesValue) => {
  return Number(((100 / totalSeriesValues) * Number(seriesValue)).toFixed(1));
};
