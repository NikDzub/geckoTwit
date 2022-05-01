import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import CoinContainer from './components/CoinContainer';

export const Home = () => {
  const [coinData, setCoinData] = useState([]);

  const geckoURI = 'http://localhost:5000/api/gecko/';

  useEffect(() => {
    (async () => {
      let popData = await axios.get(geckoURI);
      popData = popData.data.slice(0, 3);
      setCoinData(popData);
    })();
  }, []);

  return (
    <div className="home">
      {coinData.length == 3
        ? coinData.map((c) => {
            return (
              <CoinContainer
                key={c.id}
                id={c.id}
                precentage={c.precentageLastDay}
                tag={c.tag}
                img={c.img}
              ></CoinContainer>
            );
          })
        : 'no data yet'}
    </div>
  );
};
