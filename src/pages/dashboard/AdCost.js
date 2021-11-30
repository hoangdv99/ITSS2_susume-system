import { useEffect, useState } from 'react';
import { InputGroup, FormControl, Table } from 'react-bootstrap';
import { useAdvertisement } from '../../contexts/AdvertisementContext';

export default function AdCost(){
  const { advertisements } = useAdvertisement();
  const [valueSearch, setValueSearch] = useState('');
  const [advs, setAdvs] = useState(advertisements);


  useEffect(()=>{
    setAdvs(advertisements)
  }, [advertisements])
  
  const totalViews = (views) =>{
    if(typeof(views)!== 'object') return 0
    let sum = 0;
    for(let i = 0; i < views.length; i++){
      sum = sum + views[i];
    }

    return sum;
  }

  const onChangeSearch = (event) => {
    setValueSearch(event.target.value);
    let newAdList = advertisements.filter(adv => {
      if(adv.product.name.includes(event.target.value)){
        return adv;
      }
    })

    setAdvs(newAdList);
  }


 return(
   <>
    <div className="action">
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <InputGroup className="mb-3" style={{width: "500px"}}>
          <InputGroup.Text id="basic-addon1">探索</InputGroup.Text>
          <FormControl
            value={valueSearch}
            placeholder="名前で探索？"
            aria-label="探索"
            aria-describedby="basic-addon1"
            onChange={(event)=>onChangeSearch(event)}
          />
        </InputGroup>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ローンチ</th>
              <th>経った時間</th>
              <th>プロダクト</th>
              <th>記述</th>
              <th>SNS</th>
              <th>コスト</th>
            </tr>
          </thead>
          <tbody>
          {advs.length === 0 && <tr><td>データがない</td></tr>}
          {advs.length > 0 && 
            advs.map(ad => (
              <tr key={ad.id}>
                <td>{ad.id}</td>
                <td>{new Date(ad.createdAt.seconds*1000).toLocaleString('vi-GB',{timeZone:'UTC'})}</td>
                <td>null</td>
                <td>{ad.product.name}</td>
                <td>{ad.content}</td>
                <td>{ad.sns.name}</td>
                <td>{ad.sns.cost*totalViews(ad.view)}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </div>
    </div>
   </>
 )
}