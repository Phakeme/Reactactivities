import { Button, Card, Image } from 'semantic-ui-react'

import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity
  cancelSelectActivity: () => void
  openForm: (id: string) => void
}

export const ActivityDetails = (props: Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${props.activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{props.activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{props.activity.date}</span>
        </Card.Meta>
        <Card.Description>{props.activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button basic onClick={() => props.openForm(props.activity.id)} color="blue" content="Edit"></Button>
          <Button basic onClick={() => props.cancelSelectActivity()} color="grey" content="Cancel"></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
