import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../pages/login/login'
import { SignUpForm } from '../pages/singup/singup'
import Cart from '../pages/carrinho/carrinho'
import Home from '../pages/home/home'
import NotFound from '../pages/notFound/notFound'
import  Header  from "../components/header/Header";
import Footer from "../components/footer/Footer"

export function Router() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="*" element={<NotFound/>}> </Route> 
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
