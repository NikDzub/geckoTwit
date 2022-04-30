import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const CoinContainer = (props) => {
  const [tData, setTData] = useState([]);

  const twitURI = `http://localhost:5000/api/twitter/${props.tag}`;
  const geckoURI = `http://localhost:5000/api/gecko/${props.id}`;

  useEffect(() => {
    (async () => {
      let days = new Set();
      let twitData = await axios.get(twitURI, { headers: { name: props.id } });
      twitData.data.comms.map((c) => {
        const date =
          new Date(c.ca).getUTCDate() + '/' + (new Date(c.ca).getMonth() + 1);
        days.add(date);
      });
      days = Array.from(days).reverse();

      days.forEach((d) => {
        let score = 0;
        twitData.data.comms.map((c) => {
          const date =
            new Date(c.ca).getUTCDate() + '/' + (new Date(c.ca).getMonth() + 1);
          if (date == d) {
            score += c.rep + c.like + c.ret;
          }
        });
        setTData((prev) => {
          return [...prev, { name: d, uv: score, pv: '30' }];
        });
      });

      let coinData = await (await axios.get(geckoURI)).data;
      //console.log(coinData);

      setTimeout(() => {
        console.log(tData);
      }, 5000);
    })();
  }, []);

  return (
    <div className="coinContainer">
      <h3>
        ${props.tag} <img src={props.img}></img> {props.id.toUpperCase()} +
        {props.precentage}
      </h3>
      <LineChart width={400} height={100} data={tData}>
        <XAxis dataKey="name"></XAxis>
        <YAxis></YAxis>
        <Line
          dot={false}
          type="natural"
          dataKey="uv"
          stroke="#ffffff"
          strokeWidth={1}
        ></Line>
        {/* <Line
          type="monotone"
          dataKey="pv"
          stroke="#1927e6"
          strokeWidth={3}
        ></Line> */}
      </LineChart>
    </div>
  );
};

export default CoinContainer;
