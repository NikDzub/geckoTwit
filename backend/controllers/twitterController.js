const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

const getTweets = asyncHandler(async (req, res) => {
  const header = { Authorization: `Bearer ${process.env.TWTBEAR}` };
  const tweets = await axios.get(
    `https://api.twitter.com/2/tweets/search/recent?max_results=10&tweet.fields=public_metrics,created_at&user.fields=entities,location&expansions=author_id&query="$${req.params.id}" -is:reply -has:mentions -is:retweet lang:en -has:links -has:media -has:images -has:hashtags`,
    { headers: header }
  );
  let simpleData = {
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
  });

  res.status(200).json(simpleData);
});

module.exports = { getTweets };
