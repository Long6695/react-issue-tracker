import './App.css'

import AppContainer from './UI/AppContainer'
import FormIssueTracker from './components/FormIssueTracker'
import ListIssueTracker from './components/ListIssueTracker'
function App() {
  return (
    <AppContainer>
      <FormIssueTracker />
      <ListIssueTracker />
    </AppContainer>
  )
}

export default App
