import React from 'react'
import { Container } from 'react-bootstrap'
import AdvertisementForm from '../../components/advertisement/form'

export default function NewProduct() {
  return (
    <Container>
      <h3>広告作成</h3>
      <AdvertisementForm />
    </Container>
  )
}
