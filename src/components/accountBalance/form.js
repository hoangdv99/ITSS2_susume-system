import React, { useState } from 'react'
import {
  Form,
  Col,
  Row,
  Card,
  Button,
  Alert,
} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function AddMoneyToAccount() {
  const { addMoneyToAccount, currentUser, getBalance } = useAuth();
  const [balance, setbalance] = useState('')
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    console.log(balance)
    setLoading(true)
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === false) {
      console.log('2')
      e.stopPropagation()
    } else {
      let accBalance = await getBalance(currentUser.uid)
      await addMoneyToAccount(currentUser.uid, balance + accBalance)

      navigate('/')
    }
    setValidated(true)
    setLoading(false)
  }

  const warning_alert = () => {
    if (balance!=='') {
      return <Alert variant="warning" >勘定残高を足す前に、金閣を入力してください。</Alert>;
    }
    return null;
  }
  return (
    <Card bg="light">
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /><ToastContainer /> */}

      <Card.Body>
        {warning_alert()}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label>
              予算の最高限度を足す
            </Form.Label>
            <Col>
              <Form.Control type="number" value={balance} onChange={e => setbalance(parseInt(e.target.value))} required />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="success" size="lg">足す</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
