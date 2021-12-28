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
      return setError("パスワードが一致していないです。")
    }
    if (typeof phoneRef.current.value !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(phoneRef.current.value)) {
        return setError("番号のみを入力してください。")
      } else if (phoneRef.current.value.length != 10){
        return setError("電話番号が無効です。電話番号の長さは10です。")
      }
    }
    try {
      setError("")
      setLoading(true)
      await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value, phoneRef.current.value, 0)
      navigate('/')
    } catch {
      setError("アカウントの作成に失敗しました。")
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
              <Form.Control type="text" ref={phoneRef} required />
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
