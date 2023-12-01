import { makeAutoObservable, runInAction } from 'mobx'

import { Activity } from '../models/activity'
import agent from '../api/agent'
import { v4 as uuid } from 'uuid'

export default class ActivityStore {
  activities: Activity[] = []
  activitiesRegistry = new Map<string, Activity>()
  selectedActivity: Activity | undefined = undefined
  editMode = false
  loading = false
  isSubmittingActivity = false
  loadingInitial = false

  constructor() {
    makeAutoObservable(this)
  }

  loadActivities = async () => {
    this.setLoadingInitial(true)
    try {
      const activities = await agent.Activities.list()

      activities.forEach((item) => {
        item.date = item.date.split('T')[0]
      })
      this.activities = activities
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoadingInitial(false)
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((item) => item.id === id)
  }

  cancelActivity = () => {
    this.selectedActivity = undefined
  }

  openForm(id?: string) {
    id ? this.selectActivity(id) : this.cancelActivity()
    this.editMode = true
  }

  closeForm() {
    this.editMode = false
  }

  createActivity = async (activity: Activity) => {
    this.isSubmittingActivity = true
    activity.id = uuid()

    try {
      await agent.Activities.create(activity)
      runInAction(() => {
        this.activities = [...this.activities, activity]
        this.selectedActivity = activity
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => {
        this.isSubmittingActivity = false
        this.editMode = false
      })
    }
  }

  editActivity = async (activity: Activity) => {
    this.isSubmittingActivity = true

    try {
      await agent.Activities.update(activity)
      runInAction(() => {
        this.activities = [
          ...this.activities.filter((item) => item.id !== activity.id),
          activity,
        ]
        this.selectedActivity = activity
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => {
        this.isSubmittingActivity = false
        this.editMode = false
      })
    }
  }

  deleteActivity = async (id: string) => {
    this.isSubmittingActivity = true
    try {
      await agent.Activities.delete(id)
      runInAction(() => {
        this.activities = [...this.activities.filter((item) => item.id !== id)]
        if (this.selectedActivity?.id === id) this.cancelActivity
      })
    } catch (error) {
      console.log(error)
    } finally {
      console.log('Running')
      runInAction(() => {
        this.isSubmittingActivity = false
      })
    }
  }
}
