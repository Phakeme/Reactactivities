import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { SyntheticEvent, useState } from 'react'

import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

export const ActivityList = observer(() => {
  const { activityStore } = useStore()
  const [target, setTarget] = useState('')

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name)
    activityStore.deleteActivity(id)
  }

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activities.map((item) => (
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
                <Button
                  as={Link} 
                  to={`/activities/${item.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  name={item.id}
                  loading={
                    activityStore.isSubmittingActivity && target === item.id
                  }
                  onClick={(e) => handleActivityDelete(e, item.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
                <Label basic content={item.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
})
