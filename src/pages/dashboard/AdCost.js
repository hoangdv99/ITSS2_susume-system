import { useEffect, useState } from 'react';
import { InputGroup, FormControl, Table, Container, Button, Form, Col } from 'react-bootstrap';
import { useAdvertisement } from '../../contexts/AdvertisementContext';
import { Link } from 'react-router-dom'

export default function AdCost() {
  const { advertisements, getTotalCost} = useAdvertisement();
  const [valueSearch, setValueSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [advs, setAdvs] = useState(advertisements);


  useEffect(() => {
    setAdvs(advertisements)
    async function getTotal(){
      let res = await getTotalCost();
      console.log(res);
      setTotal(res)
    }
    getTotal();

  }, [advertisements])

  const totalViews = (views) => {
    if (typeof (views) !== 'object') return 0
    let sum = 0;
    for (let i = 0; i < views.length; i++) {
      sum = sum + views[i];
    }

    return sum;
  }

  const onChangeSearch = (event) => {
    setValueSearch(event.target.value);
    let newAdList = advertisements.filter(adv => {
      if (adv.product.name.includes(event.target.value)) {
        return adv;
      }
    })

    setAdvs(newAdList);
  }
  const onChangeFilter = (event) => {
    if (event.target.value != 'None'){
      let result = advertisements.filter(adv => {
        if (adv.sns.name == event.target.value) {
          return adv;
        }
      })
      setAdvs(result);
    } else {
      setAdvs(advertisements);
    }
  }


  return (
    <Container>
      <div>
        <h3>ダッシュボード</h3>
        <div className="button-list">
          <Button as={Link} to='/chart'>広告チャート</Button>
          <Button as={Link} to='/'>広告コスト</Button>
        </div>
      </div>
      <h3>コスト</h3>
      <div className="action">
        <div className="container">
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3" style={{ display: "flex", justifyContent: "flex-start" }}>
              <Form.Label column sm={2}>
              フィルター
              </Form.Label>
                <Col sm={10}>
                  <Form.Select aria-label="Default select example" onChange={(event) => onChangeFilter(event)}>
                    <option value="None">フィルターなし</option>
                    <option value="Facebook">フェイスブック</option>
                    <option value="Instagram">インスタグラム</option>
                    <option value="Twitter">ツイッター</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </div>
            <div className="col" style={{ display: "flex", justifyContent: "flex-start" }}>
              <InputGroup className="mb-3" style={{ width: "500px" }}>
                <InputGroup.Text id="basic-addon1">探索</InputGroup.Text>
                <FormControl
                  value={valueSearch}
                  placeholder="商品名で検索する"
                  aria-label="探索"
                  aria-describedby="basic-addon1"
                  onChange={(event) => onChangeSearch(event)}
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>開始日</th>
                <th>商品名</th>
                <th>コンテンツ</th>
                <th>宣伝方法</th>
                <th>コスト</th>
              </tr>
            </thead>
            <tbody>
              {advs.length === 0 && <tr><td>データがない</td></tr>}
              {advs.length > 0 &&
                advs.map(ad => (
                  <tr key={ad.id}>
                    <td>{ad.id}</td>
                    <td>{new Date(ad.createdAt.seconds * 1000).toLocaleString('vi-GB')}</td>
                    <td>{ad.product.name}</td>
                    <td>{ad.content}</td>
                    <td>{ad.sns.name}</td>
                    <td>{(ad.sns.cost * totalViews(ad.view)).toFixed(1)}円</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  )
}