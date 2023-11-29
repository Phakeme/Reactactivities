import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
  inverted?: boolean
  content?: string
}

export const UILoader = (props: Props) => (
  <Dimmer active inverted>
    <Loader content={props.content} />
  </Dimmer>
)

UILoader.defaultProps = {
  inverted: true,
  content: 'Loading...',
}
