const FORM = document.querySelector(".form")
const DAY_INPUT = document.getElementById("day")
const MONTH_INPUT = document.getElementById("month")
const YEAR_INPUT = document.getElementById("year")
const RESULT_DAYS = document.getElementById("days")
const RESULT_MONTHS = document.getElementById("months")
const RESULT_YEARS = document.getElementById("years")

function daysInMonth(month, year) {
  return parseInt(new Date(year, month, 0).getDate())
}

function animateCounter(html_element, value, delay) {
  let interval = setInterval(increment, delay)
  let counter = 0

  function increment() {
    counter++
    html_element.innerText = counter

    if (counter === value) {
      clearInterval(interval)
    }
  }
}

FORM.addEventListener("submit", (e) => {
  e.preventDefault()

  let birthday_day = parseInt(DAY_INPUT.value)
  let birthday_month = parseInt(MONTH_INPUT.value)
  let birthday_year = parseInt(YEAR_INPUT.value)

  let today = new Date()

  let today_day = today.getDate()
  let today_month = today.getMonth() + 1
  let today_year = today.getFullYear()

  if (birthday_day > today_day) {
    today_day += daysInMonth(today_month - 1, today_year)
    today_month--
  }

  if (birthday_month > today_month) {
    today_month += 12
    today_year--
  }

  let days = today_day - birthday_day
  let months = today_month - birthday_month
  let years = today_year - birthday_year

  // RESULT_YEARS.innerText = years
  // RESULT_MONTHS.innerText = months
  // RESULT_DAYS.innerText = days

  animateCounter(RESULT_YEARS, years, 1000 / years)
  animateCounter(RESULT_MONTHS, months, 80)
  animateCounter(RESULT_DAYS, days, 120)
})
