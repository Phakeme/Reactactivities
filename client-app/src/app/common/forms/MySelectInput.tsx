import { Form, Label, Select } from 'semantic-ui-react'

import { useField } from 'formik'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
  placeholder: string
  name: string
  label?: string
}

export const MySelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(_, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  )
}

