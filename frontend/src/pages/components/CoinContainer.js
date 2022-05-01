import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const CoinContainer = (props) => {
  const [tData, setTData] = useState([]);

  const twitURI = `http://localhost:5000/api/twitter/${props.tag}`;
  const geckoURI = `http://localhost:5000/api/gecko/${props.id}`;

  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  useEffect(() => {
    (async () => {
      if (cookies.tData) {
        setTData(cookies.tData);
      } else {
        let twitData = await axios.get(twitURI);
        twitData.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        let coinData = await axios.get(geckoURI);

        let chartData = [];

        twitData.data.map((td) => {
          let open = coinData.data.data[chartData.length].open;
          let close = coinData.data.data[chartData.length].close;
          if (close == 'N/A') {
            close = coinData.data.data[chartData.length].curPrice;
          }
          setTData((prev) => {
            return [...prev, {}];
          });
          chartData.push({
            name: td.date, //tddate
            tw: td.totLikes + td.totRet + td.totUsersF,
            op: parseFloat(open.trim().substring(1, close.length)),
            cl: parseFloat(close.trim().substring(1, close.length)),
          });
          if (chartData.length == 7) {
            setTData(chartData.reverse());
            //console.log(chartData);
            removeCookie('tData');
            let d = new Date();
            d.setTime(d.getTime() + 1 * 60 * 1000);
            setCookie('tData', chartData, { expires: d });
          }
        });
      }
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
        <YAxis yAxisId="left"></YAxis>
        <YAxis yAxisId="right" orientation="right"></YAxis>
        <Line
          yAxisId="right"
          dot={false}
          type="natural"
          dataKey="tw"
          stroke="#ffffff"
          strokeWidth={1}
        ></Line>
        <Line
          yAxisId="left"
          dot={false}
          type="natural"
          dataKey="op"
          stroke="#F44336"
          strokeWidth={1}
        ></Line>
        <Line
          yAxisId="left"
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
