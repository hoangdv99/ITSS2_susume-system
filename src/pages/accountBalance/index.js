import React, { useEffect, useState } from 'react'
import {
  Container,
} from 'react-bootstrap'
import AddMoneyToAccount from '../../components/accountBalance/form'
import { useAuth } from '../../contexts/AuthContext'
import { useAdvertisement } from '../../contexts/AdvertisementContext'

export default function Advertisements() {
  const { getBalance, currentUser } = useAuth();
  const {getTotalCost } = useAdvertisement()
  const [currentBalance, setCurrentBalance] = useState(0);
    const [total, setTotal] = useState(0);

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
  return (
    <Container>
      <div className="advertisements">
        <h3>勘定残高を足す</h3>
        <AddMoneyToAccount />
      </div>
      <div>
        今の勘定残高： {currentBalance}
      </div>
      <div>
        払う広告コスト： {total}
      </div>
    </Container>
  )
}