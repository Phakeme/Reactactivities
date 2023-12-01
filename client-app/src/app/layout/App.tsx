import './styles.css'

import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard'
import { Container } from 'semantic-ui-react'
import { NavBar } from './NavBar'
import { UILoader } from './UILoader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../stores/store'

function App() {
  const { activityStore } = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if (activityStore.loadingInitial) return <UILoader />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7rem' }}>
        <ActivityDashboard />
      </Container>
    </>
  )
}

export default observer(App)
