import React from 'react'
import { Form } from 'react-bootstrap'
import FilterIssueTracker from './FilterIssueTracker'
import OrderByIssueTracker from './OrderByIssueTracker'
import ListItemIssueTracker from './ListItemIssueTracker'
const ListIssueTracker = () => {
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="w-100">List Todo</h3>
        <Form.Control
          className="w-25"
          type="text"
          placeholder="Search by description..."
        />
      </div>
      <FilterIssueTracker />
      <OrderByIssueTracker />
      <ListItemIssueTracker />
    </div>
  )
}

export default ListIssueTracker
