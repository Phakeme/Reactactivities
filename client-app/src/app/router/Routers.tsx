import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'

import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard'
import { ActivityDetails } from '../../features/activities/details/ActivityDetails'
import { ActivityForm } from '../../features/activities/form/ActivityForm'
import App from '../layout/App'
import { LoginForm } from '../../features/users/LoginForm'
import { NotFound } from '../../features/errors/NotFound'
import { ServerError } from '../../features/errors/ServerError'
import TestErrors from '../../features/errors/ErrorsTest'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetails /> },
      { path: 'manage/:id', element: <ActivityForm key="manage" /> },
      { path: 'login', element: <LoginForm key="login" /> },
      { path: 'createActivity', element: <ActivityForm key="create" /> },
      { path: 'errors', element: <TestErrors /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },
      { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
