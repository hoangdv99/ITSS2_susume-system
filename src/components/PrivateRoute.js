import React from "react"
import {Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Header from '../components/layout/Header'

export default function PrivateRoute() {
  const { currentUser } = useAuth()

  return (
    currentUser ? <div>
      <Header />
      <Outlet />
    </div> : <Navigate to="/login" />
  )
}
