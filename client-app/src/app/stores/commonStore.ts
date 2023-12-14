import { makeAutoObservable, reaction } from 'mobx'

import { ServerError } from '../models/serverError'

export default class CommonStore {
  errors: ServerError | null = null
  token: string | null | undefined = localStorage.getItem('jwt')
  isAppLoaded = false

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem('jwt', token)
        } else {
          localStorage.getItem('jwt')
        }
      }
    )
  }

  setObserverError(errors: ServerError) {
    this.errors = errors
  }
  setToken = (token: string | null) => {
    localStorage.removeItem('jwt')
    this.token = token
  }

  setIsAppLoaded = () => {
    this.isAppLoaded = true
  }
}
