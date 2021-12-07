import { Table, Button } from 'react-bootstrap'
import { useProduct } from '../../contexts/ProductContext'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function ProductList() {
  const { products, deleteProduct } = useProduct()

  const remove = (id) => {
    if (window.confirm('Are you sure to delete this item?')) {
      deleteProduct(id)
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
          <th className="text-center">名前</th>
          <th className="text-center">写真</th>
          <th className="text-center">価格</th>
          <th className="text-center">残額</th>
          <th className="text-center">活動</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
            <tr key={product.id}>
              <td className="text-center">{ product.id }</td>
              <td className="text-center">{ product.name }</td>
              <td className="text-center">
                <img src={product.image} style={{width: "80px", height:"80px"}} alt="product" />
              </td>
              <td className="text-center">{ product.price }</td>
              <td className="text-center">{ product.quantity }</td>
              <td className="text-center">
                <Button variant="success"style={{marginRight:"10px"}}>
                  <Link to={`/product/${product.id}/edit`} style={{textDecoration:"none", color: '#FFF'}}>修正</Link>
                </Button>
                <Button variant="danger" onClick={() => remove(product.id)}>削除</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
