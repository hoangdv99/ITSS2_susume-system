import React from 'react'
import { Container } from 'react-bootstrap'
import ProductForm from '../../components/product/form'

export default function NewProduct() {
  return (
    <Container>
      <h3>商材作成</h3>
      <ProductForm />
    </Container>
  )
}
