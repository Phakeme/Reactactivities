import { Form, Label } from 'semantic-ui-react'

import { useField } from 'formik'

interface Props {
  rows?: number
  isTextarea?: boolean
  placeholder: string
  name: string
  label?: string
  type?: string
}

export const MyTextInput = (props: Props) => {
  const [field, meta] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {props.isTextarea ? (
        <textarea rows={props.rows} {...field} {...props} />
      ) : (
        <input {...field} {...props} />
      )}

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}

MyTextInput.defaultProps = {
  isTextarea: false,
}
