const FORM = document.querySelector(".form")
const DAY_INPUT = document.getElementById("day")
const MONTH_INPUT = document.getElementById("month")
const YEAR_INPUT = document.getElementById("year")
const RESULT_DAYS = document.getElementById("days")
const RESULT_MONTHS = document.getElementById("months")
const RESULT_YEARS = document.getElementById("years")
const ERRORS = {
  errorsPresent: false,
  dayError: document.getElementById("dayError"),
  monthError: document.getElementById("monthError"),
  yearError: document.getElementById("yearError"),
}
const ERROR_MASSAGES = [
  "This field is required",
  "must be a valid day",
  "must be a valid month",
  "Must be in the past",
  "Must be a valid date",
]

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate()
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

function errorHandler(
  current_date,
  birthday_day,
  birthday_month,
  birthday_year
) {
  ERRORS["errorsPresent"] = false
  ERRORS["dayError"].innerText = ""
  ERRORS["monthError"].innerText = ""
  ERRORS["yearError"].innerText = ""

  // Day Errors
  if (!birthday_day) {
    ERRORS["dayError"].innerText = ERROR_MASSAGES[0]
    ERRORS["errorsPresent"] = true
  } else if (birthday_day < 0 || birthday_day > 31) {
    ERRORS["dayError"].innerText = ERROR_MASSAGES[1]
    ERRORS["errorsPresent"] = true
  }

  // Month errors
  if (!birthday_month) {
    ERRORS["monthError"].innerText = ERROR_MASSAGES[0]
    ERRORS["errorsPresent"] = true
  } else if (birthday_month < 0 || birthday_month > 12) {
    ERRORS["monthError"].innerText = ERROR_MASSAGES[2]
    ERRORS["errorsPresent"] = true
  }

  // Year errors
  if (!birthday_year) {
    ERRORS["yearError"].innerText = ERROR_MASSAGES[0]
    ERRORS["errorsPresent"] = true
  } else if (birthday_year > current_date.getFullYear()) {
    ERRORS["yearError"].innerText = ERROR_MASSAGES[3]
    ERRORS["errorsPresent"] = true
  }

  // Invalid day in month
  if (
    birthday_day &&
    birthday_month &&
    birthday_year &&
    !ERRORS["errorsPresent"] &&
    birthday_day > daysInMonth(birthday_month, birthday_year)
  ) {
    ERRORS["dayError"].innerText = ERROR_MASSAGES[4]
    ERRORS["monthError"].innerText = ""
    ERRORS["yearError"].innerText = ""
    ERRORS["errorsPresent"] = true
  }

  if (
    !ERRORS["dayError"].innerText &&
    !ERRORS["monthError"].innerText &&
    !ERRORS["yearError"].innerText
  ) {
    ERRORS["errorsPresent"] = false
    ERRORS["dayError"].innerText = ""
    ERRORS["monthError"].innerText = ""
    ERRORS["yearError"].innerText = ""
  }

  let errors_elements = document.querySelectorAll(".input__error")
  console.log(errors_elements)
  errors_elements.forEach((el) => {
    if (el.innerText && ERRORS["errorsPresent"]) {
      el.parentElement.classList.add("input_error")
    } else {
      el.parentElement.classList.remove("input_error")
    }
  })
}

FORM.addEventListener("submit", (e) => {
  e.preventDefault()

  let current_date = new Date()

  let birthday_day = parseInt(DAY_INPUT.value)
  let birthday_month = parseInt(MONTH_INPUT.value)
  let birthday_year = parseInt(YEAR_INPUT.value)

  errorHandler(current_date, birthday_day, birthday_month, birthday_year)

  if (ERRORS["errorsPresent"]) return

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
