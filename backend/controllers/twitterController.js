const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

const getTweets = asyncHandler(async (req, res) => {
  const header = { Authorization: `Bearer ${process.env.TWTBEAR}` };
  const tweets = await axios.get(
    `https://api.twitter.com/2/tweets/search/recent?max_results=10&tweet.fields=public_metrics,created_at&user.fields=entities,location&expansions=author_id&query="$${req.params.id}" -is:reply -has:mentions -is:retweet lang:en -has:links -has:media -has:images -has:hashtags`,
    { headers: header }
  );

  res.status(200).json(tweets.data);
});

module.exports = { getTweets };
