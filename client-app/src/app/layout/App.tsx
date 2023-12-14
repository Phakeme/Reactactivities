import './styles.css'

import { Outlet, useLocation } from 'react-router-dom'

import { Container } from 'semantic-ui-react'
import { HomePage } from '../../features/home/HomePage'
import { ModalContainer } from '../common/modals/ModalContainer'
import { NavBar } from './NavBar'
import { ToastContainer } from 'react-toastify'
import { UILoader } from './UILoader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../stores/store'

function App() {
  const location = useLocation()
  const { userStore, commonStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setIsAppLoaded())
    } else {
      commonStore.setIsAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.isAppLoaded) return <UILoader content="Loading app.." />
  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
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

export default observer(App)
