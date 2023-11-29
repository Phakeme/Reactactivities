import './styles.css'

import { Container, Item } from 'semantic-ui-react'
import { useEffect, useState } from 'react'

import { Activity } from '../models/activity'
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard'
import { NavBar } from './NavBar'
import { UILoader } from './UILoader'
import agent from '../api/agent'
import { v4 as uuid } from 'uuid'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    agent.Activities.list().then((data) => {
      const activities: Activity[] = []
      data.forEach((item) => {
        item.date = item.date.split('T')[0]
        activities.push(item)
      })
      setActivities(activities)
      setIsLoading(false)
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id))
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelActivity()
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setIsSubmitting(true)
    if(activity.id){
        agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter((item) => item.id !== activity.id, activity)])
        setSelectedActivity(activity)
        setEditMode(false)
        setIsSubmitting(false)  
      })
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setIsSubmitting(false) 
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setIsSubmitting(true)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter((item) => item.id !== id)])
      setIsSubmitting(false)
    })
  }

  if(isLoading) return <UILoader />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7rem' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={isSubmitting}
        />
      </Container>
    </>
  )
}

export default App
