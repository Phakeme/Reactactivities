import './App.css'

import { Header, List } from 'semantic-ui-react'
import { useEffect, useState } from 'react'

import axios from 'axios'

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/activities')
      .then((res) => setActivities(res.data))
  }, [])

  return (
    <>
      <Header as="h1" icon="users" content="Reactivity" />
      <List>
        {activities.map((item: any) =>(
          <List.Item key={item.id}>{item.title}</List.Item>
        ))}
      </List>
    </>
  )
}

export default App
