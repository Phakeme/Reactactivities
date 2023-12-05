import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <Segment inverted textAlign="center" className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        <Header as="h2" inverted content="Welcome to reactivities" />
        <Button as={Link} to="/activities" size="huge" inverted>
          Take me to activities
        </Button>
      </Container>
    </Segment>
  )
}
