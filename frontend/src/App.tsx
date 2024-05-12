import { ToastContainer, Zoom } from 'react-toastify'
import AuthContextProvider from './context/AuthContext'
import { CartContextProvider } from './context/CartContext'
import Router from './routes/Router'

function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <>
          <Router></Router>
          <ToastContainer 
            position='bottom-right' 
            autoClose={2500} 
            hideProgressBar={true}
            newestOnTop={false} 
            closeOnClick={true} 
            transition={Zoom} 
            theme='light' 
            draggable={false}
            stacked={true}/>
        </>
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default App
