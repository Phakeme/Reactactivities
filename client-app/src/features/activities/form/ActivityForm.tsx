import { Button, Form, Segment } from 'semantic-ui-react'
import { ChangeEvent, useState } from 'react'

import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

//import { Activity } from "../../../app/models/activity"

export const ActivityForm = observer(() => {
  const { activityStore } = useStore()

  const initialState = activityStore.selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  }

  const [activity, setActivity] = useState(initialState)

  function handleSubmit() {
    activity.id
      ? activityStore.editActivity(activity)
      : activityStore.createActivity(activity)
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setActivity({ ...activity, [event.target.name]: event.target.value })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={activityStore.isSubmittingActivity}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => activityStore.closeForm()}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  )
})
