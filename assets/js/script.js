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
// 
// convert time to readable string (human readable format, am & pm)
// 
function hourString(hour) {
  if (hour < 12) {
    return hour + `am`;
  } else if (hour == 12) {
    return hour + `pm`;
  } else {
    return hour - 12 + `pm`;
  }
}
// 
// compare current time to timeblock and color
// 
function pastPresentOrFuture(hour) {
  hour = Number(hour);
  currentHour = Number(currentHour);
  if (hour > currentHour) {
    return `future`;
  } else if (hour == currentHour) {
    return `present`;
  } else {
    return `past`;
  }
}
// 
// make dynamic time blocks from localStorage
// 
function createBlock(time) {
  let task = "";
  if (timeBlocks[time]) {
    task = timeBlocks[time];
  }
  const textArea = $(
    `<textarea class="description" data-key=` +
    time +
    `>` +
    task +
    `</textarea>`
  );
  const container = $(`.container`);
  const freshBlock = $(`<div class="row"></div>`);
  // 
  freshBlock.append($(`<div class="hour col-2">` + hourString(time) + `</div>`));
  textArea.addClass(pastPresentOrFuture(time) + ` col-8`);
  freshBlock.append($(textArea));
  freshBlock.append(
    $(`<button class="saveBtn col-2"><i class="fas fa-save"></i></div>`)
  );
  container.append(freshBlock);
}
// 
// call function to initilize localStorage
// 
initializeLocalStorage();
// 
for (let key in timeBlocks) {
  if (key != `currentDate`) {
    createBlock(key);
  }
}