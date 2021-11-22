import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import ProductForm from '../../components/product/form'

export default function EditProduct() {
  const { id } = useParams()

  return (
    <Container>
      <h3>商材更新</h3>
      <ProductForm productId={id} />
    </Container>
  )
}
