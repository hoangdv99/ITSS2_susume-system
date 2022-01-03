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

function Chart() {
  const { advertisements } = useAdvertisement()
  const [checked, setChecked] = useState([]);
  const [data, setData] = useState([])
  const [period, setPeriod] = useState('weekly')
  const [times, setTimes] = useState(7)
  
  useEffect(() => {
    setChecked(new Array(advertisements.length).fill(true))
    setData([])
    for (let time = 1; time <= times; time++ )
    {
      let e = {}
      e["time"] = time
      advertisements.forEach(ad => {
        e[ad.title] = ad.view[time - 1]
      })
      setData(data => [...data, e])
    }
  }, [advertisements, times])
  
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

  const changePeriod = (e) => {
    setPeriod(e.target.value)
    if (e.target.value === 'weekly') setTimes(7)
    else setTimes(30)
  }
  
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
          <div className="wrapped" style={{ display: 'flex' }}>
            <select value={period} onChange={changePeriod} style={{ marginRight: '10px' }}>
              <option value='weekly'>今週</option>
              <option value='monthly'>今月</option>
            </select>
            <div className="prefs-list" style={{ flex: 5 }}>
              {advertisements.map((pref, index) => (
                <div key={index + 1} className="ad">
                  <input
                    type="checkbox"
                    id={index + 1}
                    name={pref.id}
                    value={pref.id}
                    checked={checked[index]}
                    onChange={() => handleOnChange(index + 1)}
                    className="checkbox"
                  />
                  <label>{pref.title}</label>
                </div>
              ))}
            </div>
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
                <Line  key={index + 1} dataKey={pref.title} stroke={dynamicColors()} strokeOpacity={opacity[pref.title]} activeDot={{ r: 8 }} />
              ) : null)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Container>
  );
}

export default Chart;