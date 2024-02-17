import React from 'react'
import './App.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Router } from '../src/routes/Router'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
