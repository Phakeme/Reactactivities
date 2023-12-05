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
        this.setActivity(item)
      })
      this.activities = activities
    } catch (error) {
      console.log(error)
    } finally {
      this.setLoadingInitial(false)
    }
  }

  get groupedActivities() {
    return Object.entries(
      this.activities.reduce((activities, activity) => {
        const date = activity.date
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity]
        return activities
      }, {} as { [key: string]: Activity[] })
    )
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.selectedActivity = activity
      return activity
    } else {
      this.setLoadingInitial(true)
      try {
        activity = await agent.Activities.details(id)
        this.setActivity(activity)
        return activity
      } catch (error) {
        console.log(error)
      } finally {
        this.setLoadingInitial(false)
      }
    }
  }

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0]
    this.selectedActivity = activity
  }

  private getActivity = (id: string) => {
    return this.activitiesRegistry.get(id)
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
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
      })
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => {
        this.isSubmittingActivity = false
      })
    }
  }
}
