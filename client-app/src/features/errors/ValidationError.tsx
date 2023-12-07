import { Message } from 'semantic-ui-react'

interface Props {
  errors: string[]
}

export const ValidationError = (props: Props) => {
  return (
    <Message error>
      {props.errors && (
        <Message.List>
          {props.errors.map((item: string, i) => (
            <Message.Item key={i}>{item}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  )
}
