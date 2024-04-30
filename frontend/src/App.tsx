import './App.css'
import AuthContextProvider from './context/AuthContext'
import Router from './routes/Router'

function App(): JSX.Element {
  
  return (
    <AuthContextProvider>
      <Router></Router>
    </AuthContextProvider>
  )
}

export default App
