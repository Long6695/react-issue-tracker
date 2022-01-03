import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import { useIssueContext } from 'context/issueTrackerContext'

const SearchIssueTracker = () => {
  const { setSearchText } = useIssueContext()

  const debounceRef = useRef(null)

  const handleSearchValue = (e) => {
    const value = e.target.value

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      setSearchText(value)
    }, 500)
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="w-100">List Todo</h3>
      <Form.Control
        ref={debounceRef}
        className="w-25"
        type="text"
        placeholder="Search by description..."
        onChange={handleSearchValue}
      />
    </div>
  )
}

export default SearchIssueTracker
