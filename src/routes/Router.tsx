import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../pages/login/login'
import { SignUpForm } from '../pages/singup/singup'
import Home from '../pages/home/home'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  )
}
