import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { ActivityList } from './ActivityList'
import { Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

export const ActivityDashboard = observer(() => {
  const { activityStore } = useStore()

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList  />
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity && !activityStore.editMode && (
          <ActivityDetails />
        )}
        {activityStore.editMode && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  )
})
