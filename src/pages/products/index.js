import React from 'react'
import {
  Container,
  Button
} from 'react-bootstrap'
import './index.css'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ProductList from '../../components/product/table'

export default function Products() {
  return (
    <Container>
      <div className="products">
        <h3>商材一覧</h3>
        <Button variant="primary" as={Link} to='/product/add' style={{marginBottom: "10px"}}>
          <BsFillPlusCircleFill className="btn-icon" />
          　新しい製品の追加
        </Button>
        <ProductList />
      </div>
    </Container>
  )
}
