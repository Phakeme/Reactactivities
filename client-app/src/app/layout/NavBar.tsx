import { Button, Container, Menu } from 'semantic-ui-react'

interface Props {
  openForm: () => void
}

export const NavBar = (props: Props) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: "10px"}} />
          Reactivity
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={() => props.openForm()} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}