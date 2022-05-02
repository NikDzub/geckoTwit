import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const CoinContainer = (props) => {
  const [tData, setTData] = useState([]);

  const twitURI = `http://localhost:5000/api/twitter/${props.tag}`;
  const geckoURI = `http://localhost:5000/api/gecko/${props.id}`;

  useEffect(() => {
    (async () => {
      if (props.dataCookie !== false) {
        setTData(props.dataCookie);
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
            const d = JSON.stringify(chartData);
            cookie.save(`${props.tag}`, d, {
              maxAge: 360,
            });
          }
        });
      }
    })();
  }, []);

  return (
    <div className="coinContainer">
      {tData.length == 0 ? (
        <div className="notAvailable">
          <p>Not available right now, or whatever</p>
        </div>
      ) : (
        <div className="coinChart">
          <LineChart data={tData} height={300} width={500}>
            <XAxis dataKey="name"></XAxis>
            <YAxis yAxisId="left"></YAxis>
            <YAxis yAxisId="right" orientation="right"></YAxis>
            <Line
              className="blurLine"
              yAxisId="right"
              dot={false}
              type="basis"
              dataKey="tw"
              stroke="#FFB600"
              strokeWidth={1}
            ></Line>
            <Line
              yAxisId="left"
              dot={false}
              type="basis"
              dataKey="op"
              stroke="#8ED1FC"
              strokeWidth={1}
            ></Line>
            <Line
              yAxisId="left"
              dot={false}
              type="basis"
              dataKey="cl"
              stroke="#F44336"
              strokeWidth={1}
            ></Line>
          </LineChart>
        </div>
      )}

      <div className="coinInfo">
        <div className="coinImg">
          <img src={props.img}></img>
        </div>
        <p className="coinTag">{props.tag}</p>
        <a
          className="coinDesc"
          href={`https://www.coingecko.com/en/coins/${props.id}`}
        >
          {props.id.toUpperCase().replaceAll('-', ' ')}
        </a>
        <p className="precentage">+{props.precentage}</p>
        <div className="lines">
          <span className="op">Open</span>
          <span className="cl">Close</span>
          <span className="tw">Social</span>
        </div>
      </div>
    </div>
  );
};

export default CoinContainer;
