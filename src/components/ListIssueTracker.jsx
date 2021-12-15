import React from 'react'
import { Form } from 'react-bootstrap'
import FilterIssueTracker from './FilterIssueTracker'
import OrderByIssueTracker from './OrderByIssueTracker'
import ListItemIssueTracker from './ListItemIssueTracker'
import { searchUser } from '../store/reducer/issueTrackerReducer'
import { useIssueTrackerContext } from '../store/context/issueTrackerContext'

const ListIssueTracker = () => {
  const [, dispatch] = useIssueTrackerContext()

  const handleSearchValue = (e) => {
    dispatch(searchUser(e.target.value))
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="w-100">List Todo</h3>
        <Form.Control
          className="w-25"
          type="text"
          placeholder="Search by description..."
          onKeyUp={handleSearchValue}
          tabIndex="0"
        />
      </div>
      <FilterIssueTracker />
      <OrderByIssueTracker />
      <ListItemIssueTracker />
    </div>
  )
}

export default ListIssueTracker
