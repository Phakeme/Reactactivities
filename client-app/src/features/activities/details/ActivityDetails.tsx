import  ActivityDetailChat  from './ActivityDetailChat'
import  ActivityDetailHeader  from './ActivityDetailHeader'
import  ActivityDetailInfo from './ActivityDetailInfo'
import  ActivityDetailSidebar  from './ActivityDetailSidebar'
import { Grid } from 'semantic-ui-react'
import { UILoader } from '../../../app/layout/UILoader'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../../../app/stores/store'

export const ActivityDetails = observer(() => {
  const { activityStore } = useStore()
  const params = useParams()

  useEffect(() => {
    if (params.id) activityStore.loadActivity(params.id)
  }, [activityStore, activityStore.loadActivity, params.id])

  if (activityStore.loadingInitial || !activityStore.selectedActivity) return <UILoader />

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activityStore.selectedActivity} />
        <ActivityDetailInfo activity={activityStore.selectedActivity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  )
})
