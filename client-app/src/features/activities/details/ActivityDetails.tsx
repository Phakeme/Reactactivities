import { Button, Card, Image } from 'semantic-ui-react'

import { useStore } from '../../../app/stores/store'

export const ActivityDetails = () => {
  const {activityStore} = useStore()
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
          <Button basic onClick={() => activityStore.openForm(activityStore.selectedActivity?.id)} color="blue" content="Edit"></Button>
          <Button basic onClick={() => activityStore.cancelActivity()} color="grey" content="Cancel"></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
