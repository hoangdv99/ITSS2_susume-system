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
  const { currentUser } = useAuth()
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

  const createNewAdvertisement = async (advertisement) => {
    const id = format('yyyyMMddHHmmss', new Date())
    const newAdvertisement = {
      ...advertisement,
      userId: currentUser.uid, 
      id,
      view: [
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100)
      ]
    }
    await firestore.collection('advertisements').doc(id).set(newAdvertisement)
    setAdvertisements([...advertisements, newAdvertisement])
  }

  const editAdvertisement = async (id, advertisement) => {
    await firestore.collection('advertisements').doc(id).update(advertisement)
    setFlag(flag => !flag)
  }

  const deleteAdvertisement = async (id) => {
    const newAdvertisementList = advertisements.filter(advertisement => advertisement.id !== id)
    await firestore.collection('advertisements').doc(id).delete()
    setAdvertisements(newAdvertisementList)
  }

  const value = { advertisements, getAdvertisements, createNewAdvertisement, deleteAdvertisement, editAdvertisement }
  return (
    <AdvertisementContext.Provider value={value}>
      { children }
    </AdvertisementContext.Provider>
  )
}
