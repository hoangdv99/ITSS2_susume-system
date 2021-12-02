import { Table, Button } from 'react-bootstrap'
import { useProduct } from '../../contexts/ProductContext'
import { Link } from 'react-router-dom'

export default function ProductList() {
  const { products, deleteProduct } = useProduct()
  return (
    <Table striped bordered hover>
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
                <Button variant="danger" onClick={()=>{deleteProduct(product.id)}}>削除</Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
