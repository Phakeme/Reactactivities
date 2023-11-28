import { Button, Item, Label, Segment } from 'semantic-ui-react'

import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
  deleteActivity: (id: string) => void
}

export const ActivityList = (props: Props) => {
  return (
    <Segment>
      <Item.Group divided>
        {props.activities.map((item) => (
          <Item key={item.id}>
            <Item.Content>
              <Item.Header as="a">{item.title}</Item.Header>
              <Item.Meta>{item.date}</Item.Meta>
              <Item.Description>
                <div>{item.description}</div>
                <div>
                  {item.city}, {item.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => props.selectActivity(item.id)} floated="right" content="View" color="blue"></Button>
                <Button onClick={() => props.deleteActivity(item.id)} floated="right" content="Delete" color="red"></Button>
                <Label basic content={item.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
