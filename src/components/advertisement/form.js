import React, { useEffect, useState } from 'react'
import {
  Form,
  Col,
  Row,
  Card,
  Button
} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { useProduct } from '../../contexts/ProductContext'
import { sns } from '../../constants'
import firebase from '@firebase/app-compat'

export default function AdvertisementForm({advertisementId}) {
  const [content, setContent] = useState()
  const { createNewAdvertisement, editAdvertisement, advertisements } = useAdvertisement()
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { products } = useProduct()
  const [selectedSns, setSelectedSns] = useState("Facebook")
  const [selectedProduct, setSelectedProduct] = useState('')

  useEffect(() => {
    if (advertisementId) {
      const ad = advertisements.find(ad => ad.id === advertisementId)
      setContent(ad.content)
      setSelectedSns(ad.sns.name)
      setSelectedProduct(ad.product.id)
    }
  }, [advertisementId])

  const handleSubmit = async (e) => {
    setLoading(true)
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const advertisement = {
        content,
        sns: sns.find(item => item.name === selectedSns),
        product: products.find(product => product.id === selectedProduct) || {},
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }
      if (advertisementId === undefined) {
        await createNewAdvertisement(advertisement)
      } else {
        await editAdvertisement(advertisementId, advertisement)
      }
      navigate('/advertisements')
    }
    setValidated(true)
    setLoading(false)
  }

  const handleSelectSns = (e) => {
    setSelectedSns(e.target.value)
  }
  const handleSelectProduct = e => {
    setSelectedProduct(e.target.value)
  }

  return (
      <Card bg="light">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                詳細
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" value={content} onChange={e=>setContent(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                  詳細は必須です！
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                SNS
              </Form.Label>
              <Col sm={10}>
                <Form.Select aria-label="Default select example" value={selectedSns} onChange={handleSelectSns}>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                商材
              </Form.Label>
              <Col sm={10}>
                <Form.Select aria-label="Default select example" value={selectedProduct} onChange={handleSelectProduct}>
                  <option>-- Select product for ads --</option>
                  { products.map(product => (
                    <option value={product.id}>{ product.name }</option>
                  )) }
                </Form.Select>
              </Col>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="success" size="lg" disabled={loading}>作成</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
  )
}
