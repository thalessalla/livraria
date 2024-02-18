import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../slices/loginSlice'
import Alert from '@mui/material/Alert'
import { Link } from 'react-router-dom'

import './login.css'
import { Header } from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setShowSuccess(false)
    setShowError(false)
    try {
      const response = await login({ email, password }).unwrap()
      localStorage.setItem('token', response.token)
      localStorage.setItem('username', response.username)
      setShowSuccess(true)
      const bookToPurchaseString = localStorage.getItem('bookToPurchase')
      const bookToPurchase = bookToPurchaseString
        ? JSON.parse(bookToPurchaseString)
        : null
      if (bookToPurchase) {
        navigate('/carrinho')
      } else {
        navigate('/')
      }
    } catch (error) {
      setShowError(true)
    }
  }

  return (
    <>
      <Header />
      <section className="section-login">
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          {showSuccess && <Alert severity="success">Login bem-sucedido!</Alert>}
          {showError && <Alert severity="error">Erro no login!</Alert>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <button type="submit" disabled={isLoading}>
            Login
          </button>
          <p>
            Se você ainda não tem uma conta,{' '}
            <Link to="/signUp">
              <strong>cadastre-se aqui.</strong>
            </Link>{' '}
          </p>
        </form>
      </section>
      <Footer />
    </>
  )
}
