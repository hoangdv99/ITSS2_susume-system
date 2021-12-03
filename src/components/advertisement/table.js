import { Table, Button } from 'react-bootstrap'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { Link } from 'react-router-dom'

export default function AdvertisementList() {
  const { advertisements, deleteAdvertisement } = useAdvertisement()
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center">ID</th>
          <th className="text-center">商材</th>
          <th className="text-center">詳細</th>
          <th className="text-center">SNS</th>
          <th className="text-center">活動</th>
        </tr>
      </thead>
      <tbody>
        {advertisements.map(advertisement => (
            <tr key={advertisement.id}>
              <td className="text-center">{ advertisement.id }</td>
              <td className="text-center">{ advertisement.product.name }</td>
              <td className="text-center">{ advertisement.content }</td>              
              <td className="text-center">{ advertisement.sns.name }</td>
              <td className="text-center">
                <Button variant="success"style={{marginRight:"10px", textColor:"white"}}>
                  <Link to={`/advertisement/${advertisement.id}/edit`} style={{textDecoration:"none", color: '#FFF'}}>修正</Link>
                </Button>
                <Button variant="danger" onClick={()=>{deleteAdvertisement(advertisement.id)}}>削除</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
