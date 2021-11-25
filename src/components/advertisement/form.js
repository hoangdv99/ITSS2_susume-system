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
import { uploadImage } from '../../firebase'

export default function AdvertisementForm({advertisementId}) {
  const [name, setName] = useState('')
  const [info, setInfo] = useState()
  const [sns, setSns] = useState()
  const { createNewAdvertisement, advertisements, editAdvertisement } = useAdvertisement()
  const [validated, setValidated] = useState(false)
  const [fileUpload, setFileUpload] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [fileName, setFileName] = useState()

  useEffect(() => {
    if (advertisementId) {
      const advertisement = advertisements.find(advertisement => advertisement.id == advertisementId)
      setName(advertisement.name)
      setInfo(advertisement.info)
      setSns(advertisement.sns)
      setFileUpload(advertisement.image)
      setFileName(advertisement.image)
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
        name,
        info,
        sns,
        image: fileUpload.includes('https') ? fileName : await uploadImage(fileName)
      }
      console.log(advertisementId);
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
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                名前
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" value={name} onChange={e=>setName(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                  名前は必須です！
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                詳細
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" value={info} onChange={e=>setInfo(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                  詳細は必須です！
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                SNS
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" value={sns} onChange={e=>setSns(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                  SNSは必須です！
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
            { fileUpload && <img src={fileUpload} style={{ width:"120px", height:"120px"}} alt="product" /> }
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="success" size="lg" disabled={loading}>作成</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
  )
}
