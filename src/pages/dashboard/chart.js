import React, { useEffect, useState } from "react";
import "./Chart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

var dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + ", " + g + ", " + b + ")";
};

const times = [1, 2, 3, 4, 5, 6, 7]

function Chart() {
  const { advertisements } = useAdvertisement()
  const [checked, setChecked] = useState([]);
  const [data, setData] = useState([])
  
  useEffect(() => {
    setChecked(new Array(advertisements.length).fill(false))
    setData([])
    times.forEach(time => {
      let e = {}
      e["time"] = time
      advertisements.forEach(ad => {
        e[ad.id] = ad.view[time - 1]
      })
      setData(data => [...data, e])
    })
    console.log(data);
  }, [advertisements])
  
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
    <Container>
      <div className="Chart">
        <div>
            <h3>ダッシュボード</h3>
            <div className="button-list">
              <Button as={Link} to='/chart'>広告チャート</Button>
              <Button as={Link} to='/'>広告コスト</Button>
            </div>
            
        </div>  
        <div className="prefs-container">
          <h3>チャート</h3>
          <div className="prefs-list">
            {advertisements.map((pref, index) => (
              <div key={index + 1}>
                <input
                  type="checkbox"
                  id={index + 1}
                  name={pref.id}
                  value={pref.id}
                  checked={checked[index]}
                  onChange={() => handleOnChange(index + 1)} 
                />
                <label>{pref.content}</label>
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
              {advertisements.map((pref, index) => checked[index] ? (
                <Line  key={index + 1} dataKey={pref.id} stroke={dynamicColors()} strokeOpacity={opacity[pref.id]} activeDot={{ r: 8 }} />
              ) : null)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Container>
  );
}

export default Chart;