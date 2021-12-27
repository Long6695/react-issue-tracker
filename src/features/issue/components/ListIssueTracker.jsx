import React from 'react'
import FilterIssueTracker from './FilterIssueTracker'
import OrderByIssueTracker from './OrderByIssueTracker'
import ListItemIssueTracker from './ListItemIssueTracker'
import SearchIssueTracker from './SearchIssueTracker'

const ListIssueTracker = () => {
  return (
    <div className="mt-4">
      <SearchIssueTracker />
      <FilterIssueTracker />
      <OrderByIssueTracker />
      <ListItemIssueTracker />
    </div>
  )
}

export default ListIssueTracker
