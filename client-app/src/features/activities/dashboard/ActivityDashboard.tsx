import { ActivityList } from './ActivityList'
import { Grid } from 'semantic-ui-react'
import { UILoader } from '../../../app/layout/UILoader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useStore } from '../../../app/stores/store'

export const ActivityDashboard = observer(() => {
  const { activityStore } = useStore()

  useEffect(() => {
    if (activityStore.activitiesRegistry.size <= 1)
      activityStore.loadActivities()
  }, [activityStore])

  if (activityStore.loadingInitial) return <UILoader />

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  )
})
