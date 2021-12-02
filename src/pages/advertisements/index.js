import React from 'react'
import {
  Container,
  Button
} from 'react-bootstrap'
import './index.css'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import AdvertisementList from '../../components/advertisement/table'

export default function Advertisements() {
  return (
    <Container>
      <div className="advertisements">
        <h3>広告一覧</h3>
        <Button variant="primary" as={Link} to='/advertisement/add' style={{marginBottom: "10px"}}>
          <BsFillPlusCircleFill className="btn-icon" />
          新しい広告の追加
        </Button>
        <AdvertisementList />
      </div>
    </Container>
  )
}
