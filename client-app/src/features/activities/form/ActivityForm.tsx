import * as Yup from 'yup'

import { Button, Header, Segment } from 'semantic-ui-react'
import { Form, Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Activity } from '../../../app/models/activity'
import { MyDateInput } from '../../../app/common/forms/MyDateInput'
import { MySelectInput } from '../../../app/common/forms/MySelectInput'
import { MyTextInput } from '../../../app/common/forms/MyTextInput'
import { UILoader } from '../../../app/layout/UILoader'
import { categoryOptions } from '../../../app/common/options/categoryOptions'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'

export const ActivityForm = observer(() => {
  const { activityStore } = useStore()
  const params = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  })

  const validationSchema = Yup.object({
    title: Yup.string().required('Required field'),
    description: Yup.string().required('Required field'),
    category: Yup.string().required('Required field'),
    date: Yup.string().required('Required field'),
    venue: Yup.string().required('Required field'),
    city: Yup.string().required('Required field'),
  })

  useEffect(() => {
    if (params.id)
      activityStore
        .loadActivity(params.id)
        .then((activity) => setActivity(activity!))
  }, [activityStore, params.id])

  function handleFormSubmit(activity: Activity) {
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

  if (activityStore.loadingInitial) return <UILoader />

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ isValid, isSubmitting, dirty, handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextInput
              isTextarea
              rows={3}
              placeholder="Description"
              name="description"
            />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={!isValid || !dirty || isSubmitting}
              loading={activityStore.isSubmittingActivity}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})
