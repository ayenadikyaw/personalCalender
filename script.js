// global variables

//for default settings
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const endYear = 2030;
let days = document.getElementsByClassName("day");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Get the select year
var yearSelect = document.getElementById("year-select");
// get the select month
var monthSelect = document.getElementById("month-select");
//to store date and notes
let DateArr = [];
let noteArr = [];

//generate calendar with current year and month
calendar(currentYear, currentMonth);
// Call the function to generate year options
generateYearOptions();
// Call the function to generate month options
generateMonthOptions();

/**
 * to generate years from the select box
 */
function generateYearOptions() {
  // Clear any existing options
  yearSelect.innerHTML = "";

  // Generate years from 1500 to 2030 year
  for (var year = 1950; year <= endYear; year++) {
    var option = document.createElement("option");
    option.text = year;
    option.value = year;
    yearSelect.appendChild(option);
  }
  yearSelect.value = currentYear;
}

/**
 * to generate months from the select box
 */
function generateMonthOptions() {
  monthSelect.innerHTML = "";

  for (var month = 0; month < 12; month++) {
    var option = document.createElement("option");
    option.text = months[month];
    option.value = months[month];
    monthSelect.appendChild(option);
  }
  console.log(currentMonth);
  monthSelect.value = months[currentMonth - 1];
}

/**
 * To show calendar
 */
function calendar(year, month) {
  //startDate
  let startDate = new Date(year, month - 1, 1).getDay();
  console.log(startDate);
  let endDate = new Date(year, month, 0).getDate();
  console.log(endDate);
  let countDate = 1;

  for (let index = startDate; index < 42; index++) {
    if (countDate <= endDate) {
      days[index].innerHTML = countDate++;
    }
  }
}

//reset current data to empty
function reset() {
  for (let index = 0; index < 42; index++) {
    days[index].innerHTML = "";
    days[index].style.backgroundColor = "";
  }
}

/**
 * Function to update calendar when year or month changes
 */
yearSelect.onchange = monthSelect.onchange = function () {
  reset();
  const selectedYear = parseInt(yearSelect.value);
  const selectedMonth = monthInNum(monthSelect.value);
  calendar(selectedYear, selectedMonth);

  checkNotes(selectedYear, selectedMonth - 1);
};

/**
 * to convert month name to number
 * @param {*} name of month (e.g. January)
 * @returns
 */
function monthInNum(monthName) {
  switch (monthName) {
    case "January":
      return 1;
    case "February":
      return 2;
    case "March":
      return 3;
    case "April":
      return 4;
    case "May":
      return 5;
    case "June":
      return 6;
    case "July":
      return 7;
    case "August":
      return 8;
    case "September":
      return 9;
    case "October":
      return 10;
    case "November":
      return 11;
    case "December":
      return 12;
  }
}

/**
 * To store date and notes when user clicks on add note button
 */
function addNote() {
  let dateOfNote = document.getElementById("datetime").value;

  let datedNote = new Date(dateOfNote);
  DateArr.push(datedNote);

  let note = document.getElementById("textbox").value;
  noteArr.push(note);

  yearOfNote = datedNote.getFullYear();
  monthOfNote = datedNote.getMonth();

  yearSelect.value = yearOfNote;
  monthSelect.value = months[monthOfNote];
  reset();
  calendar(parseInt(yearSelect.value), monthInNum(monthSelect.value));
  clearColor();
  checkNotes(yearOfNote, monthOfNote);
}

/**
 * to reset the note color
 */
function clearColor() {
  for (let index = 0; index < 42; index++) {
    days[index].style.backgroundColor = "";
  }
}

/**
 * to show Note in the respective Date
 * @param {*} date
 * @param {*} note
 */
function showNote(date, note) {
  console.log(date, note);
  var startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  var index = date.getDate() + startDay - 1;
  //console.log(index);

  days[index].innerHTML += "<div>" + note + "</div>";
  days[index].style.backgroundColor = "thistle";
  //showNote(DateArr,noteArr);
}

/**
 * if have notes, to show them in the corresponding date
 * @param {*} year 
 * @param {*} month 
 */
function checkNotes(year, month) {
  console.log(DateArr);
  console.log(noteArr);
  console.log(year, month);
  for (let index = 0; index < DateArr.length; index++) {
    console.log(DateArr[index].getMonth());
    if (
      DateArr[index].getFullYear() == year &&
      DateArr[index].getMonth() == month
    ) {
      showNote(DateArr[index], noteArr[index]);
    }
  }
}

/**
 * to show all the notes user created
 */
function showAllNotes() {
  console.log("reach show all notes");
  document.getElementById("notes-items").innerHTML ="";
  for (let index = 0; index < DateArr.length; index++) {
    date =
      DateArr[index].getDate() +
      "-" +
      (DateArr[index].getMonth()+1) +
      "-" +
      DateArr[index].getFullYear();

    note = noteArr[index];
    document.getElementById("notes-items").innerHTML +="<p>"+date+" => "+note+"</p>";
  }
}

/**
 * to clear all notes when click on clear button
 */
function clearNotes() {
  document.getElementById("notes-items").innerHTML ="";
}