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

function errorHandler() {
  const inputs = document.querySelectorAll(".form__input input")

  inputs.forEach((input) => {
    let small = input.nextElementSibling
    if (!input.value) {
      small.innerText = "This field is required"
      return false
    } else {
      small.innerText = ""
    }
  })

  if (inputs[0].value > daysInMonth(inputs[1].value, inputs[2].value)) {
    let small = inputs[0].nextElementSibling
    small.innerText = "Must be a valid date"

    return false
  }

  return true
}

FORM.addEventListener("submit", (e) => {
  e.preventDefault()

  if (!errorHandler()) {
    return
  }

  let birthday_day = parseInt(DAY_INPUT.value)
  let birthday_month = parseInt(MONTH_INPUT.value)
  let birthday_year = parseInt(YEAR_INPUT.value)

  let current_date = new Date()

  let current_date_day = current_date.getDate()
  let current_date_month = current_date.getMonth() + 1
  let current_date_year = current_date.getFullYear()

  if (birthday_day > current_date_day) {
    current_date_day += daysInMonth(current_date_month - 1, current_date_year)
    current_date_month--
  }

  if (birthday_month > current_date_month) {
    current_date_month += 12
    current_date_year--
  }

  let days = current_date_day - birthday_day
  let months = current_date_month - birthday_month
  let years = current_date_year - birthday_year

  // RESULT_YEARS.innerText = years
  // RESULT_MONTHS.innerText = months
  // RESULT_DAYS.innerText = days

  animateCounter(RESULT_YEARS, years, 1000 / years)
  animateCounter(RESULT_MONTHS, months, 80)
  animateCounter(RESULT_DAYS, days, 120)
})
