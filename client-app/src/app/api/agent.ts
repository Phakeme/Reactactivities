import { User, UserFormValues } from '../models/user'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { router, routes } from '../router/Routers'

import { Activity } from '../models/activity'
import { store } from '../stores/store'
import { toast } from 'react-toastify'

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(
  async (res) => {
    await sleep(1000)
    return res
  },
  (err: AxiosError) => {
    const { data, status, config } = err.response as AxiosResponse
    switch (status) {
      case 400:
        if (
          config.method === 'get' &&
          Object.prototype.hasOwnProperty.call(data.errors, 'id')
        ) {
          router.navigate('/not-found')
        }
        if (data.errors) {
          const modalStateErrors = []
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key])
            }
          }
          throw modalStateErrors.flat()
        } else {
          toast.error(data)
        }
        break
      case 401:
        toast.error('Unauthorized')
        break
      case 403:
        toast.error('Forbidden')
        break
      case 500:
        store.commonStore.setObserverError(data)
        router.navigate('/server-error')
        toast.error('Server Error')
        break
      case 404:
        router.navigate('/not-found')
        break
    }

    return Promise.reject(err)
  }
)

function responseBody<T>(response: AxiosResponse<T>) {
  return response.data
}

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
  list: () => request.get<Activity[]>('/activities'),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => request.post<void>('/activities', activity),
  update: (activity: Activity) =>
    request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/activities/${id}`),
}

const Account = {
  current: () => request.get<User>('/account'),
  login: (user: UserFormValues) => request.post<User>('/account/login', user),
  register: (user: UserFormValues) =>
    request.post<User>('/account/register', user),
}

const agent = {
  Activities,
  Account,
}

export default agent
