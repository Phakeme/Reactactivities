import { Header, Item } from 'semantic-ui-react'

import { ActivityListItem } from '../details/ActivityListItem'
import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

export const ActivityList = observer(() => {
  const { activityStore } = useStore()

  return (
    <>
      {activityStore.groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
            <Item.Group divided>
              {activities.map((item) => (
                <ActivityListItem activity={item} key={item.id} />
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </>
  )
})
