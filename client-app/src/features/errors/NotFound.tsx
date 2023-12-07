import { Button, Header, Icon, Segment } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Ops! Page not found :(
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities">
          Return to activities page
        </Button>
      </Segment.Inline>
    </Segment>
  )
}
