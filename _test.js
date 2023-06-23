require('dotenv').config()

const henryVIIIBirthDate = new Date(1491, 5, 28);

function calculateTimeSinceHenryVIII() {
  // Birth date of Henry VIII: June 28, 1491

  // Current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - henryVIIIBirthDate;

  // Convert the time difference into years, months, and days
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor((timeDifference / (1000 * 60 * 60 * 24 * 30.4375)) % 12);
  const days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 30.4375);

  // Create and return the result object
  const result = {
    years: years,
    months: months,
    days: days
  };

  return result;
}


const since = calculateTimeSinceHenryVIII();
const today = new Date();

let copy = `Were he alive today, King Henry VIII would be `;

if (today.getMonth() === henryVIIIBirthDate.getMonth() && today.getDate() === henryVIIIBirthDate.getDate()) {
  copy += `${since.years} years old exactly. Happy birthday Henry 🎉`;
} else {
  let statement = `${since.years} year${since.years !== 1 ? 's' : ''}`;

  if (since.months > 0 || since.days > 0) {
    statement += `, ${since.months} month${since.months !== 1 ? 's' : ''}`;
  }

  if (since.months > 0 && since.days > 0) {
    statement += ' and';
  }

  if (since.days > 0) {
    statement += ` ${since.days} day${since.days !== 1 ? 's' : ''}`;
  }

  copy += `${statement} old.`;
}

console.log(copy);
