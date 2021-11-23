import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"
import { format } from 'date-fns/fp'

const ProductContext = React.createContext()

export function useProduct() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const { currentUser } = useAuth()
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    if (currentUser) getProducts()
  }, [currentUser, flag])

  const getProducts = async () => {
    setProducts([])
    const data = await firestore.collection('products').where('userId', '==', currentUser.uid).get();
    data.forEach(doc => {
        const product = doc.data()
        setProducts(products => [...products, product])
    })
  }

  const createNewProduct = async (product) => {
    const id = format('yyyyMMddHHmmss', new Date())
    const newProduct = { ...product, userId: currentUser.uid, id}
    await firestore.collection('products').doc(id).set(newProduct)
    setProducts([...products, newProduct])
  }

  const editProduct = async (id, product) => {
    await firestore.collection('products').doc(id).update(product)
    setFlag(flag => !flag)
  }

  const deleteProduct = async (id) => {
    const newProductList = products.filter(product => product.id !== id)
    await firestore.collection('products').doc(id).delete()
    setProducts(newProductList)
  }

  const value = { products, getProducts, createNewProduct, deleteProduct, editProduct }
  return (
    <ProductContext.Provider value={value}>
      { children }
    </ProductContext.Provider>
  )
}
