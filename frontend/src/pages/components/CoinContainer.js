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
      let twitData = await axios.get(twitURI);
      twitData.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      console.log(twitData.data);

      let coinData = await axios.get(geckoURI);
      console.log(coinData.data);

      let chartData = [];

      twitData.data.map((td) => {
        let open = coinData.data.data[chartData.length].open;
        let close = coinData.data.data[chartData.length].close;
        if (close == 'N/A') {
          close = coinData.data.data[chartData.length].curPrice;
        }
        chartData.push({
          name: '', //tddate
          tw: td.totLikes + td.totRet + td.totUsersF,
          op: parseFloat(open.trim().substring(1, close.length)),
          cl: parseFloat(close.trim().substring(1, close.length)),
        });
        if (chartData.length == 7) {
          setTData(chartData.reverse());
          console.log(chartData);
        }
      });
    })();
  }, []);

  return (
    <div className="coinContainer">
      <h3>
        ${props.tag} <img src={props.img}></img> {props.id.toUpperCase()} +
        {props.precentage}
      </h3>
      <LineChart width={400} height={200} data={tData}>
        <XAxis dataKey="name"></XAxis>
        <YAxis></YAxis>
        {/* <Line
          dot={false}
          type="natural"
          dataKey="tw"
          stroke="#ffffff"
          strokeWidth={1}
        ></Line> */}
        <Line
          dot={false}
          type="natural"
          dataKey="op"
          stroke="#F44336"
          strokeWidth={1}
        ></Line>
        <Line
          dot={false}
          type="natural"
          dataKey="cl"
          stroke="#8ED1FC"
          strokeWidth={1}
        ></Line>
      </LineChart>
    </div>
  );
};

export default CoinContainer;
