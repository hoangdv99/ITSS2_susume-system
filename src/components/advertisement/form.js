import React, { useEffect, useState } from 'react'
import {
  Form,
  Col,
  Row,
  Card,
  Button,
  Alert,
} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { useProduct } from '../../contexts/ProductContext'
import { sns } from '../../constants'
import firebase from '@firebase/app-compat'
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'

export default function AdvertisementForm({ advertisementId }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState()
  const { createNewAdvertisement, editAdvertisement, advertisements, getTotalCost } = useAdvertisement()
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { products } = useProduct()
  const [selectedSns, setSelectedSns] = useState("Facebook")
  const [selectedProduct, setSelectedProduct] = useState('')
  const [total, setTotal] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const { getBalance, currentUser } = useAuth();

  useEffect(() => {
    async function getTotal() {
      let res = await getTotalCost();
      console.log(res);
      setTotal(res)
    }
    getTotal();

    async function getCurrentBalance() {
      let cb = await getBalance(currentUser.uid)
      setCurrentBalance(cb)
    }

    getCurrentBalance();
    if (advertisementId) {
      const ad = advertisements.find(ad => ad.id === advertisementId)
      setContent(ad.content)
      setSelectedSns(ad.sns.name)
      setSelectedProduct(ad.product.id)
      setTitle(ad.title)
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
        createdAt: new Date(),
        title
      }
      if (advertisementId === undefined) {
        const newAds = await createNewAdvertisement(advertisement)
        if (newAds.status === 1) {
          toast.success(newAds.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          setTimeout(() => {
            navigate('/advertisements')
          }, 1200);
        } else {
          toast.error(newAds.message, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      } else {
        await editAdvertisement(advertisementId, advertisement)
        toast.success('正常に編集されました', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/advertisements')
        }, 1200);
      }
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

  const warning_alert = () => {
    if (products.length == 0) {
      return <Alert variant="warning" >製品がありません。広告の作成する前に、製品の追加をしてください。</Alert>;
    }
    return null;
  }
  return (
    <Card bg="light">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Card.Body>
        {warning_alert()}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              タイトル
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                タイトルは必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              コンテンツ
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={content} onChange={e => setContent(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                詳細は必須です！
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              宣伝方法
            </Form.Label>
            <Col sm={10}>
              <Form.Select aria-label="Default select example" value={selectedSns} onChange={handleSelectSns}>
                <option value="Facebook">フェイスブック</option>
                <option value="Instagram">インスタグラム</option>
                <option value="Twitter">ツイッター</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              商品名
            </Form.Label>
            <Col sm={10}>
              <Form.Select aria-label="Default select example" value={selectedProduct} onChange={handleSelectProduct}>
                <option>-- 製品を選択する --</option>
                {products.map(product => (
                  <option value={product.id}>{product.name}</option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="success" size="lg" disabled={loading || !selectedProduct || total > currentBalance}>{advertisementId ? '更新' : '作成'}</Button>
          </div>
          {console.log(total, currentBalance)}
          {total > currentBalance &&
            <div style={{ borderRadius: "5px", backgroundColor: "rgba(255,229,100,0.3)", borderLeft: "solid 4px #ffe564", padding: "16px 8px" }}>
              勘定残高が足りません!広告を作成できません。
            </div>
          }
        </Form>
      </Card.Body>
    </Card>
  )
}
