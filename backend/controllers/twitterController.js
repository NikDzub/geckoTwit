const asyncHandler = require('express-async-handler');
const axios = require('axios').default;

const getTweets = asyncHandler(async (req, res) => {
  //https://api.twitter.com/2/tweets/search/recent?query=%24set%20OR%20%2310set&start_time=2022-04-26T00:00:00.000Z&max_results=10&tweet.fields=text
  const query = `query="$zpay"`;
  const header = { Authorization: `Bearer ${process.env.TWTBEAR}` };
  const tweets = await axios.get(
    `https://api.twitter.com/2/tweets/search/recent?${query}`,
    {
      headers: header,
    }
  );
  let simpleData = tweets.data;
  /* let simpleData = {
    lastDate: Date.parse(
      tweets.data.data[tweets.data.data.length - 1].created_at
    ),
    totLikes: 0,
    totUsers: tweets.data.includes.users.length,
    totTweets: tweets.data.meta.result_count,
    totComms: 0,
  };
  tweets.data.data.map((t) => {
    simpleData.totLikes += t.public_metrics.like_count;
    simpleData.totComms += t.public_metrics.reply_count;
  }); */

  res.status(200).json(simpleData);
});

module.exports = { getTweets };
