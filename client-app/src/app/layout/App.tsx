import './styles.css'

import { Outlet, useLocation } from 'react-router-dom'

import { Container } from 'semantic-ui-react'
import { HomePage } from '../../features/home/HomePage'
import { NavBar } from './NavBar'
import { ToastContainer } from 'react-toastify'

function App() {
  const location = useLocation()

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: '7rem' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default App
