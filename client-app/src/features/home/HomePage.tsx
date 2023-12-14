import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { LoginForm } from '../users/LoginForm'
import { RegisterForm } from '../users/RegisterForm'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

export const HomePage = observer(() => {
  const { userStore, modalStore } = useStore()
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
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to reactivities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm/>)}
              size="huge"
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  )
})
