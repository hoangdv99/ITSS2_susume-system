import Button from '@restart/ui/esm/Button'
import { Table } from 'react-bootstrap'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { Link } from 'react-router-dom'

export default function AdvertisementList() {
  const { advertisements, deleteAdvertisement } = useAdvertisement()
  return (
    <Table striped>
      <thead>
        <tr>
          <th className="text-center">ID</th>
          <th className="text-center">名前</th>
          <th className="text-center">詳細</th>
          <th className="text-center">写真</th>
          <th className="text-center">SNS</th>
        </tr>
      </thead>
      <tbody>
        {advertisements.map(advertisement => (
            <tr key={advertisement.id}>
              <td className="text-center">{ advertisement.id }</td>
              <td className="text-center">{ advertisement.name }</td>
              <td className="text-center">
                <img src={advertisement.image} style={{width: "80px", height:"80px"}} alt="advertisement" />
              </td>
              <td className="text-center">{ advertisement.price }</td>
              <td className="text-center">{ advertisement.quantity }</td>
              <td className="text-center">
                <Button style={{marginRight:"10px", background:"yellow"}}>
                  <Link to={`/advertisement/${advertisement.id}/edit`} style={{textDecoration:"none"}}>Edit</Link>
                </Button>
                <Button style={{background:"#eb5e34"}} onClick={()=>{deleteAdvertisement(advertisement.id)}}>Delete</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
