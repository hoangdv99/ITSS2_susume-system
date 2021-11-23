import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Products from '../pages/products'
import NewProduct from '../pages/products/new'
import EditProduct from "../pages/products/edit"
import { ProductProvider } from "../contexts/ProductContext"

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Dashboard />}/>
            </Route>
            <Route path='/update-profile' element={<PrivateRoute />}>
              <Route path='/update-profile' element={<UpdateProfile />}/>
            </Route>
            <Route path='/products' element={<PrivateRoute />}>
              <Route path='/products' element={<Products />}/>
            </Route>
            <Route path='/product/add' element={<PrivateRoute />}>
              <Route path='/product/add' element={<NewProduct />}/>
            </Route>
            <Route path='/product/:id/edit' element={<PrivateRoute />}>
              <Route path='/product/:id/edit' element={<EditProduct />}/>
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
