require('dotenv').config();
const Twit = require('twit');
const cron = require('node-cron');

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

  let years = currentDate.getFullYear() - henryVIIIBirthDate.getFullYear()
  
  if(currentDate.getMonth() < 5 || currentDate.getMonth() === 5 && currentDate.getDate() < 28)
    years = currentDate.getFullYear() - henryVIIIBirthDate.getFullYear() - 1

  let months

  if(currentDate.getMonth() === 5 && currentDate.getDate() > 28)
    months = 0
  else if(currentDate.getMonth() > 5)
    months = currentDate.getMonth() + 1 - 6
  else
    months = currentDate.getMonth() + 1 + 6

  if(currentDate.getDate() < 28)
    months --


  let days = currentDate.getDate()

  const plusTwo = [9, 4, 6, 11]
  const plusThree = [0, 1, 3, 5, 7, 8, 10]

  if(currentDate.getDate() < 28) {
    if(plusTwo.indexOf(currentDate.getMonth()) > -1)
      days = currentDate.getDate() + 2
    else if(plusThree.indexOf(currentDate.getMonth()) > -1)
      days = currentDate.getDate() + 3
  } else {
    days -= 28
  }

  // Create and return the result object
  const result = {
    years: years,
    months: months,
    days: days,
  };

  console.log(`Result`)
  console.log(result)

  return result;
}

console.log('Running...');

cron.schedule('0 8 * * *', () => {
  setTimeout(() => {
    const since = calculateTimeSinceHenryVIII();
    const today = new Date();

    let copy = `Were he alive today, King Henry VIII would be ${since.years} years`;
  
    if (today.getMonth() === 5 && today.getDate() === 28) {
      copy += ` old exactly. Happy birthday Henry 🎉`;
    } else {
      let statement = ''

      if(since.months === 1 && since.days === 0)
        statement += ` and 1 month`
      else if(since.months > 1 && since.days === 0)
        statement += ` and ${since.months} months`
      else if(since.months === 1)
        statement += `, 1 month`
      else if(since.months > 1)
        statement += `, ${since.months} months`

      if(since.days === 1)
        statement += ` and 1 day`
      else if(since.days > 1)
        statement += ` and ${since.days} days`

      copy += `${statement} old.`;
    }

    console.log(`Posting tweet: ${copy}`);
    sendTweet(copy);
  }, Math.random() * (1000 * 60 * 60 * 13));
});