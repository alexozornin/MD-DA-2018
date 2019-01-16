library(forecast)
library(spatstat)
library(lubridate)

spawnArgs <- commandArgs(trailingOnly=TRUE)
if (length(spawnArgs) < 2) {
  data <- read.csv("./data/XOM.csv")
  fcdate = "2019-02-12"
} else {
  data <- read.csv(spawnArgs[1])
  fcdate <- spawnArgs[2]
}
fcdate = as.Date(fcdate)

if (year(fcdate) != 2019) {
  print("!Ошибка даты")
}

datalen = length(data$close)

data$date <- as.Date(data$date)
data$day <- day(data$date)
data$ivolume <- 1 / data$close

closeMean <- mean(data$close)

dayNum <- numeric(31)
dayClose <- numeric(31)
for (i in 1:datalen) {
  dayNum[data$day[i]] <- dayNum[data$day[i]] + 1
  dayClose[data$day[i]] <- dayClose[data$day[i]] + data$close[i]
}
dayClose <- dayClose / dayNum
dayCoefficient <- dayClose / closeMean

trainSet <- ts(data$close, start = c(2014, 1, 10), end = c(2018, 12, 31), frequency = 12)

monthArima <- auto.arima(trainSet)
monthForecast <- forecast(monthArima, h = 12)

forecasted <- as.numeric(monthForecast$mean)
res <- forecasted[month(fcdate)]
print(res * dayCoefficient[day(fcdate)])