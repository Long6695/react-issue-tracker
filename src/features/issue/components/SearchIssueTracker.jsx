import React from 'react'
import { Form } from 'react-bootstrap'
import { useIssueContext } from 'context/issueTrackerContext'

const SearchIssueTracker = () => {
  const { searchText, setSearchText } = useIssueContext()

  const handleSearchValue = (e) => {
    const value = e.target.value
    setSearchText(value)
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="w-100">List Todo</h3>
      <Form.Control
        className="w-25"
        type="text"
        placeholder="Search by description..."
        value={searchText}
        onChange={handleSearchValue}
      />
    </div>
  )
}

export default SearchIssueTracker
