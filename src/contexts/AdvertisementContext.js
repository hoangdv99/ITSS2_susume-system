import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"
import { format } from 'date-fns/fp'

const AdvertisementContext = React.createContext()

export function useAdvertisement() {
  return useContext(AdvertisementContext)
}

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

export function AdvertisementProvider({ children }) {
  const [advertisements, setAdvertisements] = useState([])
  const { currentUser, getBalance } = useAuth()
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    if (currentUser) getAdvertisements()
  }, [currentUser, flag])

  const getAdvertisements = async () => {
    setAdvertisements([])
    const data = await firestore.collection('advertisements').where('userId', '==', currentUser.uid).get();
    data.forEach(doc => {
      const advertisement = doc.data()
      setAdvertisements(advertisements => [...advertisements, advertisement])
    })
  }

  const getTotalCost = async () => {
    let total = 0;
    const data = await firestore.collection('advertisements').where('userId', '==', currentUser.uid).get();
    data.forEach(doc => {
      let totalView = 0;
      doc.data().view.map(v => {
        totalView = totalView + v
        return v
      })
      total = total + totalView * doc.data().sns.cost
    })

    return total;
  }

  const createNewAdvertisement = async (advertisement) => {
    const id = format('yyyyMMddHHmmss', new Date())
    const view = []
    for (let i = 0; i < 30; i++) {
      view[i] = getRandomArbitrary(0, 100)
    }

    let cb = await getBalance(currentUser.uid);
    let total = await getTotalCost();
    let totalViews = 0;

    view.map(v => {
      totalViews = totalViews + v;
      return v;
    })
    let newAdvertisement = {
      ...advertisement,
      userId: currentUser.uid,
      id,
      view
    }

    if (totalViews * advertisement.sns.cost + total - cb >= 0) {
      return {
        status: 0,
        message: '残りの金額は、新しい広告を作成するのに十分ではありません。予算を調整してください。'
      }
    } else {
      await firestore.collection('advertisements').doc(id).set(newAdvertisement)
      setAdvertisements([...advertisements, newAdvertisement])
      setFlag(flag => !flag)
      return {
        status: 1,
        message: '新しい広告を作成しました。'
      }
    }
  }

  const editAdvertisement = async (id, advertisement) => {
    await firestore.collection('advertisements').doc(id).update(advertisement)
    setFlag(flag => !flag)
  }

  const deleteAdvertisement = async (id) => {
    const newAdvertisementList = advertisements.filter(advertisement => advertisement.id !== id)
    await firestore.collection('advertisements').doc(id).delete()
    setAdvertisements(newAdvertisementList)
    setFlag(flag => !flag)
  }

  const value = { advertisements, getAdvertisements, createNewAdvertisement, deleteAdvertisement, editAdvertisement, getTotalCost }
  return (
    <AdvertisementContext.Provider value={value}>
      {children}
    </AdvertisementContext.Provider>
  )
}
