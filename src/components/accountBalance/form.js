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

export default function AddMoneyToAccount({onHandleSetBalance, handleCloseAdd}) {
  const { currentUser, getBalance } = useAuth();
  const [balance, setbalance] = useState('')
  const [validated, setValidated] = useState(false)
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
      //await addMoneyToAccount(currentUser.uid, balance + accBalance)

      onHandleSetBalance(currentUser.uid, balance + accBalance)
      // navigate('/account-balance')
    }
    setValidated(true)
    setLoading(false)
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
        <Alert variant="warning" >勘定残高を足す前に、金閣を入力してください。</Alert>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label>
              予算額を足す
            </Form.Label>
            <Col>
              <Form.Control type="number" value={balance} onChange={e => setbalance(parseInt(e.target.value))} required />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="warning" onClick={handleCloseAdd}>キャンセル</Button>
            <Button type="submit" variant="success">足す</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
