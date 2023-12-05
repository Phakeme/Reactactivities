import { Button, Icon, Item, Segment } from 'semantic-ui-react'

import { Activity } from '../../../app/models/activity'
import { Link } from 'react-router-dom'

interface Props {
  activity: Activity
}

export const ActivityListItem = (props: Props) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item.Group>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src="/assets/user.png"
              ></Item.Image>
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${props.activity.id}`}>
                  {props.activity.title}
                </Item.Header>
                <Item.Description>Hosted by Phakeme Fakazi</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {props.activity.date}
          <Icon name="marker" /> {props.activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees here</Segment>
      <Segment clearing>
        <span>{props.activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${props.activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  )
}
