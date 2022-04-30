const asyncHandler = require('express-async-handler');
const axios = require('axios').default;

const getTweets = asyncHandler(async (req, res) => {
  const header = { Authorization: `Bearer ${process.env.TWTBEAR}` };
  const tweets = await axios.get(
    `https://api.twitter.com/2/tweets/search/recent?max_results=100&tweet.fields=public_metrics,created_at&user.fields=entities,location&expansions=author_id&query="$${req.params.id}" "${req.headers.name}" -top -last -is:reply -is:retweet`,
    {
      headers: header,
    }
  );
  if (!tweets.data.data) {
    res.status(404).json({ message: 'no tweets found' });
    return;
  }
  let data = {
    lastDate: new Date(
      tweets.data.data[tweets.data.data.length - 1].created_at
    ),
    users: [],
    comms: [],
  };

  tweets.data.data.map((t) => {
    const com = {
      ca: new Date(t.created_at),
      txt: t.text,
      rep: t.public_metrics.reply_count,
      like: t.public_metrics.like_count,
      ret: t.public_metrics.retweet_count,
    };
    data.comms.push(com);
  });

  tweets.data.includes.users.map((u) => {
    const user = {
      username: u.username,
      cashTs: [],
    };
    if (
      u.entities &&
      u.entities.description &&
      u.entities.description &&
      u.entities.description.cashtags
    ) {
      user.cashTs = u.entities.description.cashtags;
    }
    data.users.push(user);
  });

  res.status(200).json(data);
});

module.exports = { getTweets };
