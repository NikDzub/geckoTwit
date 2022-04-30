const asyncHandler = require('express-async-handler');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.CK,
  consumer_secret: process.env.CSK,
  access_token_key: process.env.ATK,
  access_token_secret: process.env.ATS,
});

const getTweets = asyncHandler(async (req, res) => {
  const past7Days = [...Array(7).keys()].map((index) => {
    let date = new Date();
    date.setDate(date.getDate() - index);
    date = date.toISOString();
    return date.substring(0, date.indexOf('T'));
  });

  let daysData = [];

  past7Days.map((d) => {
    const until = past7Days[past7Days.indexOf(d) - 1];
    const since = d;
    let params = {
      q: `${req.params.id} "$${req.params.id}" (${req.params.id}) -RSI -top -popular -recent -trending -movers min_replies:2 min_faves:2 min_retweets:2 until:${until} since:${since} -filter:replies`,
    };
    if (until == undefined) {
      params = {
        q: `${req.params.id} "$${req.params.id}" (${req.params.id}) -RSI -top -popular -recent -trending -movers min_replies:2 min_faves:2 min_retweets:2 since:${since} -filter:replies`,
      };
    }
    client.get('search/tweets', params, function (error, tweets, response) {
      if (error) {
        console.log(error);
      }
      if (!error) {
        let date = d;
        let totLikes = 0;
        let totRet = 0;
        let totUsersF = 0;

        tweets.statuses.map((s) => {
          totRet += s.retweet_count;
          totLikes += s.favorite_count;
          totUsersF += s.user.followers_count;
        });
        daysData.push({ date, totLikes, totRet, totUsersF });

        if (daysData.length == 7) {
          res.status(200).json([...daysData]);
        }
      }
    });
  });
});

module.exports = { getTweets };
