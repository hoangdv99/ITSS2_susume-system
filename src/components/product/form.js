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
        image: fileUpload.includes('https') ? fileName : await uploadImage(fileName)
      }
      if (productId === undefined) {
        await createNewProduct(product)
        toast.success('Created successfully', {
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
        toast.success('Edited successfully', {
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
              名前
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                名前は必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              価格
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                価格は必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              残額
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                残額は必須です！
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
            <Button type="submit" variant="success" size="lg" disabled={loading}>作成</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
