import { Button, Form, Segment } from 'semantic-ui-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { UILoader } from '../../../app/layout/UILoader'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'

export const ActivityForm = observer(() => {
  const { activityStore } = useStore()
  const params = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  })

  useEffect(() => {
    if (params.id)
      activityStore
        .loadActivity(params.id)
        .then((activity) => setActivity(activity!))
  }, [activityStore, params.id])

  function handleSubmit() {
    if (!activity.id) {
      activity.id = uuid()
      activityStore
        .createActivity(activity)
        .then(() => navigate(`/activities/${activity.id}`))
    } else {
      activityStore
        .editActivity(activity)
        .then(() => navigate(`/activities/${activity.id}`))
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setActivity({ ...activity, [event.target.name]: event.target.value })
  }

  if (activityStore.loadingInitial) return <UILoader />

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
        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  )
})
