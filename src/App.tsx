import React from 'react';
import './App.css';
import Home from "../src/pages/home/home"
import { store } from './store/store';
import { Provider }   from 'react-redux';

function App() {
  return ( 
   
   <Provider store={ store }>
   <Home />

   </ Provider>
   
  );
}

export default App;
