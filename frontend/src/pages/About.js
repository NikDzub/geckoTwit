import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const About = () => {
  return (
    <div className="about">
      <p>geckTwit v1.0.0</p>
      <p>Coingecko's top 300 coins - last 24h gainers</p>
      <p>1 week - price vs *twitter-activity</p>
      <p>
        *twitter activity - $cashtag(only) preformance (tweets,likes,replies...)
        <br></br>query : cashtag "$cashtag" (cashtag) -RSI -top -popular -recent
        -trending
        <br></br>
        -movers min_replies:0 min_faves:0 min_retweets:0 until:--/--/--
        since:--/--/-- -filter:replies`,
      </p>
      <p>
        *Influencers follow the news, not create it. When they start tweeting
        about a certain coin more often,<br></br> it's because its price has
        changed not vice versa.
      </p>
      <a
        href="https://www.coingecko.com/en/coins/trending?top=300"
        target={'_blank'}
      >
        https://www.coingecko.com/en/coins/trending?top=300
      </a>
    </div>
  );
};
