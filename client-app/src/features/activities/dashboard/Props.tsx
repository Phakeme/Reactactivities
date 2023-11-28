import { Activity } from '../../../app/models/activity'

export interface Props {
  activities: Activity[]
  selectedActivity: Activity | undefined
  editMode: boolean
  selectActivity: (id: string) => void
  cancelSelectActivity: () => void
  openForm: (id: string) => void
  closeForm: () => void
  handleCreateOrEditActivity: (id?: string) => void
}
