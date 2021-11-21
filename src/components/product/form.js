import React from 'react'
import {
  Form,
  Col,
  Row,
  Card,
  Button
} from 'react-bootstrap'

export default function ProductForm() {
  return (
      <Card bg="light">
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                名前
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                価格
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                残額
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                写真
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file" />
              </Col>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <Button variant="success" size="lg">作成</Button>
          </div>
        </Card.Body>
      </Card>
  )
}
