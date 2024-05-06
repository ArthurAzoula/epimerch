import './App.css'
import AuthContextProvider from './context/AuthContext'
import { CartContextProvider } from './context/CartContext'
import Router from './routes/Router'

function App(): JSX.Element {
  
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Router></Router>
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default App
