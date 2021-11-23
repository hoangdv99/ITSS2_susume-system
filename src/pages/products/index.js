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
        <Button variant="success" as={Link} to='/product/add' style={{marginBottom: "10px"}}>
          <BsFillPlusCircleFill className="btn-icon" />
          Add new product
        </Button>
        <ProductList />
      </div>
    </Container>
  )
}
