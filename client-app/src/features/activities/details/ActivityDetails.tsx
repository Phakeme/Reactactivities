import { Button, Card, Image } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom'

import { UILoader } from '../../../app/layout/UILoader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../../../app/stores/store'

export const ActivityDetails = observer(() => {
  const {activityStore} = useStore()
  const params = useParams()
  
useEffect(() => {
  if(params.id) activityStore.loadActivity(params.id)
}, [activityStore, activityStore.loadActivity, params.id])

if(activityStore.loadingInitial) return <UILoader />

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activityStore.selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activityStore.selectedActivity?.date}</span>
        </Card.Meta>
        <Card.Description>{activityStore.selectedActivity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button as={Link} to={`/manage/${activityStore.selectedActivity?.id}`} basic color="blue" content="Edit"></Button>
          <Button as={Link} to="/activities" basic color="grey" content="Cancel"></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
})
