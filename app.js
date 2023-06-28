require('dotenv').config();
const Twit = require('twit');
const cron = require('node-cron');
const { differenceInYears, differenceInMonths, differenceInDays } = require('date-fns');

const twitClient = new Twit({
  consumer_key: process.env.twitter_api_key,
  consumer_secret: process.env.twitter_api_secret,
  access_token: process.env.twitter_access_token,
  access_token_secret: process.env.twitter_access_secret,
});

function sendTweet(tweetText) {
  twitClient.post('statuses/update', { status: tweetText }, function (err, data, response) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Tweet sent successfully!');
    }
  });
}

const henryVIIIBirthDate = new Date(1491, 5, 28);

function calculateTimeSinceHenryVIII() {
  // Current date
  const currentDate = new Date();

  const years = differenceInYears(currentDate, henryVIIIBirthDate);
  const months = differenceInMonths(currentDate, henryVIIIBirthDate) % 12;
  const days = differenceInDays(currentDate, henryVIIIBirthDate) % 30;

  // Create and return the result object
  const result = {
    years: years,
    months: months,
    days: days,
  };

  return result;
}

console.log('Running...');

cron.schedule('0 8 * * *', () => {
  setTimeout(() => {
    const since = calculateTimeSinceHenryVIII();
    const today = new Date();

    let copy = `Were he alive today, King Henry VIII would be `;

    if (today.getMonth() === henryVIIIBirthDate.getMonth() && today.getDate() === henryVIIIBirthDate.getDate()) {
      copy += `${since.years} years old exactly. Happy birthday Henry 🎉`;
    } else {
      let statement = `${since.years} year${since.years !== 1 ? 's' : ''}`;

      if (since.months > 0 || since.days > 0)
        statement += `, ${since.months} month${since.months !== 1 ? 's' : ''}`;

      if (since.months > 0 && since.days > 0)
        statement += ' and';

      if (since.days > 0)
        statement += ` ${since.days} day${since.days !== 1 ? 's' : ''}`;

      copy += `${statement} old.`;
    }

    console.log(`Posting tweet: ${copy}`);
    sendTweet(copy);
  }, Math.random() * (1000 * 60 * 60 * 13));
});