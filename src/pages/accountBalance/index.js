import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Table,
  ProgressBar,
  Alert
} from 'react-bootstrap'
import AddMoneyToAccount from '../../components/accountBalance/form'
import { useAuth } from '../../contexts/AuthContext'
import { useAdvertisement } from '../../contexts/AdvertisementContext'
import { Modal, Box, Typography, Input } from '@material-ui/core'
import './index.css'

export default function Advertisements() {
  const { getBalance, currentUser, addMoneyToAccount } = useAuth();
  const {getTotalCost, advertisements } = useAdvertisement()
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amountSet, setAmountSet] = useState(0);
  const [total, setTotal] = useState(0);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openSet, setOpenSet] = React.useState(false);
  const handleOpenSet = () => setOpenSet(true);
  const handleCloseSet = () => setOpenSet(false);

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
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
  }, [getTotalCost, getBalance, currentUser])

  const totalViews = (views) => {
    if (typeof (views) !== 'object') return 0
    let sum = 0;
    for (let i = 0; i < views.length; i++) {
      sum = sum + views[i];
    }

    return sum;
  }

  const onHandleSetBalance = (uid, amount) => {
    async function setBalanceAccount(){
      let res = await addMoneyToAccount(uid, parseInt(amount));
      console.log(res);
    }

    setBalanceAccount();
    handleCloseSet();
    handleCloseAdd();
  }

  return (
    <Container>
      <div className="advertisements">
        <h3>??????</h3>
        <div className='information'>
        <div>
          <div className='title' style={{color: "green"}}>??????</div>
          <div>{currentBalance}???</div>
        </div>
        <div>
          <div className='title' style={{color: "red"}}>??????</div>
          <div>{Math.round(total)}???</div>
        </div>
        <div>
          <div className='title' style={{color: "olive"}}>??????</div>
          <div>{Math.round(currentBalance-total)}???</div>
        </div>
      </div>
      <div className='action-yosan'>
          <Button onClick={handleOpenSet} variant="success">??????????????????</Button>
          <Button onClick={handleOpenAdd} variant="warning">???????????????</Button>
      </div>
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ??????????????????
          </Typography>
          <AddMoneyToAccount
            onHandleSetBalance={onHandleSetBalance}
            handleCloseAdd={handleCloseAdd}
          />
        </Box>
      </Modal>
      <Modal
        open={openSet}
        onClose={handleCloseSet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ?????????????????????
            <Alert variant='warning' className='alert'>
              ?????????????????????????????????????????????????????????????????????
            </Alert>
            <Input
              value={amountSet}
              placeholder='???????????????'
              type='number'
              onChange={(event)=>setAmountSet(event.target.value)}
              style={{width: '100%'}}
              />
          </Typography>
          <div className='modal-action'>
            <Button variant="warning" onClick={handleCloseSet}>???????????????</Button>
            <Button
              variant="success"
              onClick={()=>onHandleSetBalance(currentUser.uid, parseInt(amountSet))}
              disabled={parseInt(amountSet) >=total? false: true}
            >
              ?????????
            </Button>
          </div>
        </Box>
      </Modal>
      </div>
      <div className='progress-group'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center col-md-2">????????????</th>
            <th className="text-center col-md-4">?????????</th>
            <th className="text-center col-md-2">???????????????</th>
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
                    label={`${Math.round((Math.round((advertisement.sns.cost * totalViews(advertisement.view)+ Number.EPSILON)*100)/100)*100/currentBalance)}%`}
                  />  
                </td>              
                <td className="text-center">{(advertisement.sns.cost * totalViews(advertisement.view)).toFixed(1)}???</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      </div>
    </Container>
  )
}