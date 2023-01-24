// 
// global variables
// 
let today = moment();
let currentHour = today.format(`H`);
let timeBlocks = {};
const storage = `timeBlocks`;
// 
// display current day
// 
$(`#currentDay`).text(today.format(`dddd, MMM Do`));
// 
// check for existing localStorage
// if from current date > load
// if not > clear
// 
function initializeLocalStorage() {
  if (localStorage.getItem(storage)) {
    timeBlocks = JSON.parse(localStorage.getItem(storage));
    if (timeBlocks.currentDate == today.format(`MM/DD/YYYY`)) {
      return;
    } else {
      localStorage.removeItem(storage);
    }
  }
  // 
  // fill timeblock array
  // 
  timeBlocks.currentDate = today.format(`MM/DD/YYYY`);
  for (let hour = 9; hour <= 17; hour++) {
    timeBlocks[hour] = "";
  }
  localStorage.setItem(storage, JSON.stringify(timeBlocks));
}
