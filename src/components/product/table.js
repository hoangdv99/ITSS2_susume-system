import { Table, Button } from 'react-bootstrap'
import { useProduct } from '../../contexts/ProductContext'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { useAdvertisement } from '../../contexts/AdvertisementContext'

export default function ProductList() {
  const { products, deleteProduct } = useProduct()
  const { advertisements } = useAdvertisement()
  const [page, setPage] = useState(1)
  const [numberPage, setNumberPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState([])
  const limitPerPage = 5;
  const handleChange = (event, value) => {
		setPage(value)
	}

  useEffect(() => {
		setPaginatedProducts(
			products.slice(
				(page - 1) * limitPerPage,
				(page - 1) * limitPerPage + limitPerPage
			)
		)
	}, [page, products])

	useEffect(() => {
		setNumberPage(
			parseInt(products.length / limitPerPage) * limitPerPage <
				products.length
				? parseInt(products.length / limitPerPage) + 1
				: parseInt(products.length / limitPerPage)
		);
	}, [products]);

  const remove = (id) => {
    let checkAdExisted = false;
    if (window.confirm('このアイテムを削除してもよろしいですか？')) {
      advertisements.forEach(ad => {
        if (ad.product.id === id) {
          checkAdExisted = true
        }
      })
    }

    if (!checkAdExisted) {
      deleteProduct(id)
      toast.success('正常に削除されました', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('広告されている商材を削除してはいけない', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <>
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
        />
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">名前</th>
            <th className="text-center">写真</th>
            <th className="text-center">価格</th>
            <th className="text-center">サイズ</th>
            <th className="text-center">材料</th>
            <th className="text-center">残額</th>
            <th className="text-center">活動</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map(product => (
            <tr key={product.id}>
              <td className="text-center">{product.id}</td>
              <td className="text-center">{product.name}</td>
              <td className="text-center">
                <img src={product.image} style={{ width: "80px", height: "80px" }} alt="product" />
              </td>
              <td className="text-center">{product.price}</td>
              <td className="text-center">{product.size ? product.size.toString() : ''}</td>
              <td className="text-center">{product.material}</td>
              <td className="text-center">{product.quantity}</td>
              <td className="text-center">
                <Button variant="success" style={{ marginRight: "10px" }}>
                  <Link to={`/product/${product.id}/edit`} style={{ textDecoration: "none", color: '#FFF' }}>修正</Link>
                </Button>
                <Button variant="danger" onClick={() => remove(product.id)}>削除</Button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
      <Pagination
        count={numberPage}
        variant='outlined'
        shape='rounded'
        page={page}
        onChange={handleChange}
      />
    </>
  )
}
