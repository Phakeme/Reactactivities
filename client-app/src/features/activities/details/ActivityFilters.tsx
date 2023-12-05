import { Header, Menu } from 'semantic-ui-react'

import Calendar from 'react-calendar'

export const ActivityFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: '100%', marginTop: 35 }}>
        <Header icon="filter" color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I am going" />
        <Menu.Item content="I am hosting" />
      </Menu>
      <Header/>
      <Calendar/>
    </>
  )
}
