import { Table, Button } from 'react-bootstrap'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'

export default function AdvertisementList() {
  const { advertisements, deleteAdvertisement } = useAdvertisement()
  const [page, setPage] = useState(1)
  const [numberPage, setNumberPage] = useState(1)
  const [paginatedAds, setPaginatedAds] = useState([])
  const limitPerPage = 5;
  const handleChange = (event, value) => {
		setPage(value)
	}

  useEffect(() => {
		setPaginatedAds(
			advertisements.slice(
				(page - 1) * limitPerPage,
				(page - 1) * limitPerPage + limitPerPage
			)
		)
	}, [page, advertisements])

	useEffect(() => {
		setNumberPage(
			parseInt(advertisements.length / limitPerPage) * limitPerPage <
				advertisements.length
				? parseInt(advertisements.length / limitPerPage) + 1
				: parseInt(advertisements.length / limitPerPage)
		);
	}, [advertisements]);

  const remove = (id) => {
    if (window.confirm('このアイテムを削除してもよろしいですか？')) {
      deleteAdvertisement(id)
      toast.success('正常に削除されました', {
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
        /><ToastContainer />
        <thead>
          <tr>
            <th className="text-center col-md-1">ID</th>
            <th className="text-center col-md-2">タイトル</th>
            <th className="text-center col-md-2">商材</th>
            <th className="text-center col-md-4">詳細</th>
            <th className="text-center col-md-1">SNS</th>
            <th className="text-center col-md-2">活動</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAds.map(advertisement => (
              <tr key={advertisement.id}>
                <td className="text-center">{ advertisement.id }</td>
                <td className="text-center">{ advertisement.title }</td>
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
