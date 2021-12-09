import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const phoneRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value, phoneRef.current.value)
      navigate('/')
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh", marginTop: "20px" }}>
      <Container style={{maxWidth: "400px"}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">サインアップ</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>名前</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>メール</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>パスワード確認</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="phone-number">
              <Form.Label>電話番号</Form.Label>
              <Form.Control type="tel" pattern="[0-9]{10}" ref={phoneRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              サインアップ
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        アカウントがある? <Link to="/login">ログイン</Link>
      </div>
      </Container>
    </div>
  )
}
