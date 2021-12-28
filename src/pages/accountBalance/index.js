import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Table,
  ProgressBar
} from 'react-bootstrap'
import AddMoneyToAccount from '../../components/accountBalance/form'
import { useAuth } from '../../contexts/AuthContext'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { Modal, Box, Typography } from '@material-ui/core'
import './index.css'

export default function Advertisements() {
  const { getBalance, currentUser } = useAuth();
  const {getTotalCost, advertisements } = useAdvertisement()
  const [currentBalance, setCurrentBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  useEffect(()=>{
    async function getCurrentBalance(){
      let cb = await getBalance(currentUser.uid)
      setCurrentBalance(cb)
    }

    async function getTotal(){
        let res = await getTotalCost();
        console.log(res);
        setTotal(res)
      }
      getTotal();

    getCurrentBalance();
  })

  const totalViews = (views) => {
    if (typeof (views) !== 'object') return 0
    let sum = 0;
    for (let i = 0; i < views.length; i++) {
      sum = sum + views[i];
    }

    return sum;
  }

  return (
    <Container>
      <div className="advertisements">
        <h3>予算</h3>
        <div className='information'>
        <div>
          <div className='title' style={{color: "green"}}>予算</div>
          <div>{currentBalance}円</div>
        </div>
        <div>
          <div className='title' style={{color: "red"}}>支出</div>
          <div>{Math.round(total)}円</div>
        </div>
        <div>
          <div className='title' style={{color: "olive"}}>残高</div>
          <div>{Math.round(currentBalance-total)}円</div>
        </div>
      </div>
      <div className='action'>
          <Button onClick={handleOpen} variant="success">予算をセット</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            予算の最高限度をセット
          </Typography>
          <AddMoneyToAccount />
        </Box>
      </Modal>
      </div>
      <div className='progress-group'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center col-md-2">タイトル</th>
            <th className="text-center col-md-4">詳細</th>
            <th className="text-center col-md-2">広告コスト</th>
          </tr>
        </thead>
        <tbody>
          {advertisements.map(advertisement => (
              <tr key={advertisement.id}>
                <td className="text-center">{ advertisement.title }</td>
                <td className="text-center">
                  <ProgressBar
                    variant="success"
                    now={(Math.round((advertisement.sns.cost * totalViews(advertisement.view)+ Number.EPSILON)*100)/100)*100/currentBalance}
                  />  
                </td>              
                <td className="text-center">{Math.round((advertisement.sns.cost * totalViews(advertisement.view)+ Number.EPSILON)*100)/100}円</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      </div>
    </Container>
  )
}