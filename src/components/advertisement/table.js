import { Table, Button } from 'react-bootstrap'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function AdvertisementList() {
  const { advertisements, deleteAdvertisement } = useAdvertisement()
  const remove = (id) => {
    if (window.confirm('Are you sure to delete this item?')) {
      deleteAdvertisement(id)
      toast.success('Deleted successfully', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } 
  return (
    <Table striped bordered hover>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /><ToastContainer />
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
                <Button variant="danger" onClick={() => remove(advertisement.id)}>削除</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
