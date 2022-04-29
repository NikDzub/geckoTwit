import React from 'react';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const CoinContainer = (props) => {
  const data = [
    { name: '1/4', uv: '10', pv: '30' },
    { name: '2/4', uv: '22', pv: '68' },
    { name: '3/4', uv: '32', pv: '58' },
    { name: '4/4', uv: '32', pv: '38' },
    { name: '5/4', uv: '14', pv: '58' },
    { name: '6/4', uv: '15', pv: '68' },
  ];
  return (
    <div className="coinContainer">
      <h3>
        <img src={props.img}></img> {props.id.toUpperCase()} +{props.precentage}
      </h3>
      <p>{props.tag} </p>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name"></XAxis>
        <YAxis></YAxis>
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#ac0e6b"
          strokeWidth={3}
        ></Line>
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#1927e6"
          strokeWidth={3}
        ></Line>
      </LineChart>
    </div>
  );
};

export default CoinContainer;
