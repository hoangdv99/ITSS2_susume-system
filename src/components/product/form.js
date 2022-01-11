import React, { useEffect, useState } from 'react'
import {
  Form,
  Col,
  Row,
  Card,
  Button
} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useProduct } from '../../contexts/ProductContext'
import { uploadImage } from '../../firebase'
import { ToastContainer, toast } from 'react-toastify';

export default function ProductForm({ productId }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [size, setSize] = useState([])
  const [material, setMaterial] = useState('')
  const { createNewProduct, products, editProduct } = useProduct()
  const [validated, setValidated] = useState(false)
  const [fileUpload, setFileUpload] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [fileName, setFileName] = useState()

  useEffect(() => {
    if (productId) {
      const product = products.find(product => product.id === productId)
      setName(product.name)
      setPrice(product.price)
      setQuantity(product.quantity)
      setFileUpload(product.image)
      setFileName(product.image)
      setSize(product.size)
      setMaterial(product.material)
    }
  }, [productId])

  const handleSubmit = async (e) => {
    setLoading(true)
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const product = {
        name,
        price,
        quantity,
        size,
        material,
        image: fileUpload.includes('https') ? fileName : await uploadImage(fileName)
      }
      if (productId === undefined) {
        await createNewProduct(product)
        toast.success('正常に作成されました', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

      } else {
        await editProduct(productId, product)
        toast.success('正常に編集されました', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      setTimeout(() => {
        navigate('/products')
      }, 1200)
    }
    setValidated(true)
    setLoading(false)
  }

  const handleChange = async e => {
    setFileName(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFileUpload(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSelect = (e) => {
    setSize(Array.from(e.target.selectedOptions, (item) => item.value));
  }

  return (
    <Card bg="light">
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
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              商品名
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                商品名は必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              商品コスト
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                商品コストは必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              サイズ
            </Form.Label>
            <Col sm={10}>
              <Form.Select aria-label="Default select example" value={size} onChange={handleSelect} multiple={true}> 
                <option value="S">サイズ　S</option>
                <option value="M">サイズ　M</option>
                <option value="L">サイズ　L</option>
                <option value="XL">サイズ　XL</option>
                <option value="XXL">サイズ　XXL</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              材料
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={material} onChange={e => setMaterial(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                材料は必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              在庫数
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                残っている製品は必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              写真
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="file" onChange={handleChange} />
            </Col>
          </Form.Group>
          {fileUpload && <img src={fileUpload} style={{ width: "120px", height: "120px" }} alt="product" />}
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="success" size="lg" disabled={loading}>{productId ? '更新' : '作成'}</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
