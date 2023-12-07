import { Container, Header, Segment } from 'semantic-ui-react'

import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

export const ServerError = observer(() => {
  const { commonStore } = useStore()
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={commonStore.errors?.message} />
      {commonStore.errors?.details && (
        <Segment>
          <Header as="h4" content="Stack Trace" color="teal" />
          <code style={{ marginTop: '10px' }}>
            {commonStore.errors.details}
          </code>
        </Segment>
      )}
    </Container>
  )
})
