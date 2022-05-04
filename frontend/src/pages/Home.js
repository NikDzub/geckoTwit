import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

import CoinContainer from './components/CoinContainer';

export const Home = () => {
  const [coinData, setCoinData] = useState([]);

  const geckoURI = 'http://localhost:5000/api/gecko/';

  useEffect(() => {
    const getData = async () => {
      let popData = await axios.get(geckoURI);
      console.log('get');
      setCoinData(popData.data.slice(0, 10));
    };
    getData();
    const live = setInterval(getData, 50000);
  }, []);

  return (
    <div className="home">
      {coinData.length == 10
        ? coinData.map((c) => {
            let dataCookie = false;
            if (cookie.load(`${c.tag}`)) {
              const b = cookie.load(`${c.tag}`);
              dataCookie = b;
            }
            return (
              <CoinContainer
                dataCookie={dataCookie}
                key={c.id}
                id={c.id}
                precentage={c.precentageLastDay}
                tag={c.tag}
                img={c.img}
              ></CoinContainer>
            );
          })
        : ''}
      <div className="lines">
        <p className="line o">open</p>
        <p className="line c">close</p>
        <p className="line s">social</p>
      </div>
    </div>
  );
};
