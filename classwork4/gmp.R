# Загрузите данные в датафрейм /data/gmp.dat 
gmp <- read.table("https://raw.githubusercontent.com/SergeyMirvoda/MD-DA-2018/master/data/gmp.dat", header = TRUE)
gmp$pop <- gmp$gmp / gmp$pcgmp

estimate.scaling.exponent <- function(a, y0=6611, response=gmp$pcgmp,
                                        predictor = gmp$pop, maximum.iterations=100, deriv.step = 1/100,
                                        step.scale = 1e-12, stopping.deriv = 1/100) {
  mse <- function(a) { mean((response - y0*predictor^a)^2) }
  for (iteration in 1:maximum.iterations) {
    deriv <- (mse(a+deriv.step) - mse(a))/deriv.step
    a <- a - step.scale*deriv
    if (abs(deriv) <= stopping.deriv) { break() }
  }
  fit <- list(a=a,iterations=iteration,
              converged=(iteration < maximum.iterations))
  return(fit)
}

#Пример вызова с начальным занчением a
k <- estimate.scaling.exponent(0.15)

#С помошью полученного коэффициента постройте кривую (функция curve) зависимости
curve(6611 * x ^ k$a,
      xlab = "Население",
      ylab = "ВВП / Человек",
      from = 1,
      to = 1000)

#Удалите точку из набора исходных данных случайным образом, как изменилось статистическая оценка коэффициента a?
set.seed(86548435, kind = "Knuth-TAOCP-2002")
gmp <- gmp[-c(sample.int(nrow(gmp), 1))]
k_changed <- estimate.scaling.exponent(0.15)
k$a - k_changed$a
#Значение не изменилось

#Запустите оценку несколько раз с разных стартовых точек. Как изменилось значение a?
progression <- function(x) { estimate.scaling.exponent(0.15, x)$a }
progression_seq <- Vectorize(progression)

estimate.scaling.exponent(0.15, 1000)
estimate.scaling.exponent(0.15, 2000)
estimate.scaling.exponent(0.15, 5000)
estimate.scaling.exponent(0.15, 10000)
#Значение a убывает