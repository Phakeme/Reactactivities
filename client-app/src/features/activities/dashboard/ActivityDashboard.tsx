import { Activity } from '../../../app/models/activity'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { ActivityList } from './ActivityList'
import { Grid } from 'semantic-ui-react'

interface Props {
  activities: Activity[]
  selectedActivity: Activity | undefined
  editMode: boolean
  submitting: boolean
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  openForm: (id: string) => void
  closeForm: () => void
  createOrEditActivity: (activity: Activity) => void
  deleteActivity: (id: string) => void
}

export const ActivityDashboard = (props: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
          <ActivityList
            activities={props.activities}
            selectActivity={props.selectActivity}
            deleteActivity={props.deleteActivity}
            submitting={props.submitting}
          />
      </Grid.Column>
      <Grid.Column width="6">
        {props.selectedActivity && !props.editMode && (
          <ActivityDetails
            activity={props.selectedActivity}
            cancelSelectActivity={props.cancelSelectActivity}
            openForm={props.openForm}
          />
        )}
        {props.editMode && (
          <ActivityForm
            closeForm={props.closeForm}
            activity={props.selectedActivity}
            createOrEditActivity={props.createOrEditActivity}
            submitting={props.submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}
