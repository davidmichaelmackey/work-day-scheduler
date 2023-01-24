// 
// global variables
// 
let today = moment();
let currentHour = today.format(`H`);
let timeBlocks = {};
const storageKeyName = `timeBlocks`;

// display today's date
$(`#currentDay`).text(today.format(`dddd, MMM Do`));