import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import AdvertisementForm from '../../components/advertisement/form'

export default function EditAdvertisement() {
  const { id } = useParams()

  return (
    <Container>
      <h3>広告更新</h3>
      <AdvertisementForm advertisementId={id} />
    </Container>
  )
}
