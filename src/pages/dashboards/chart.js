import React, { useState } from "react";
import "./Chart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Button} from '@material-ui/core';
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

var dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + ", " + g + ", " + b + ")";
};

const data = [];
const prefs = [
  {
    "code": 1,
    "name": 'ID1',
    "color": dynamicColors(),
  }, 
  {
    "code": 2,
    "name": 'ID2',
    "color": dynamicColors(),
  },
  {
    "code": 3,
    "name": 'ID3',
    "color": dynamicColors(),
  },
  {
    "code": 4,
    "name": 'ID4',
    "color": dynamicColors(),
  },
  {
    "code": 5,
    "name": 'ID5',
    "color": dynamicColors(),
  },
  {
    "code": 6,
    "name": 'ID6',
    "color": dynamicColors(),
  }, 
  {
    "code": 7,
    "name": 'ID7',
    "color": dynamicColors(),
  },
  {
    "code": 8,
    "name": 'ID8',
    "color": dynamicColors(),
  },
  {
    "code": 9,
    "name": 'ID9',
    "color": dynamicColors(),
  },
  {
    "code": 10,
    "name": 'ID10',
    "color": dynamicColors(),
  }
];
const times = [1, 2, 3, 4, 5, 6, 7];

times.forEach((time) => {
  let e = {};
  e["time"] = time;
  prefs.forEach((pref) => {
    e[pref.name] = getRandomArbitrary(0, 100);
  });
  data.push(e);
});

function Chart() {
  const [checked, setChecked] = useState(
    new Array(prefs.length).fill(false)
  );
  
  const handleOnChange = (position) => {
    const updatedCheckedState = checked.map((item, index) =>
      index === position - 1 ? !item : item
    );
    setChecked(updatedCheckedState);
  };
  
  const [opacity, setOpacity] = useState({
    'C': 1,
    'G': 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity({ ...opacity, [dataKey]: 0.5 });
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity({ ...opacity, [dataKey]: 1 });
  };
  
  return (
    <div className="Chart">
      <div>
          <h3>ダッシュボード</h3>
          <div className="button-list">
            <Button variant="contained"> 広告ビュー回 </Button>
            <Button variant="contained">売上チャート</Button>
            <Button variant="contained">広告コスト</Button>
          </div>
          
      </div>  
      <div className="prefs-container">
        <h3>チャート</h3>
        <div className="prefs-list">
          {prefs.map(pref => (
            <div key={pref.code}>
              <input
                type="checkbox"
                id={pref.code}
                name={pref.name}
                value={pref.name}
                checked={checked[pref.code-1]}
                onChange={() => handleOnChange(pref.code)} 
              />
              <label>{pref.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{value: 'ビュー数', offset:-12, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            {prefs.map(pref => checked[pref.code - 1] ? (
              <Line  key={pref.code} dataKey={pref.name} stroke={pref.color} strokeOpacity={opacity[pref.name]} activeDot={{ r: 8 }} />
            ) : null)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;