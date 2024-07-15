import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { CommonContext } from './context/CommonContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <BrowserRouter>
      <CommonContext>
        <App />
      </CommonContext>
    </BrowserRouter>
  </ChakraProvider>
)
