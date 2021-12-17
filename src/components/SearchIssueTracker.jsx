import React, { useRef } from 'react'
import { searchUser } from '../store/reducer/issueTrackerReducer'
import { useIssueTrackerContext } from '../store/context/issueTrackerContext'
import { Form } from 'react-bootstrap'
const SearchIssueTracker = () => {
  const [, dispatch] = useIssueTrackerContext()
  const typingTimeoutRef = useRef(null)

  const handleSearchValue = (e) => {
    const value = e.target.value

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      dispatch(searchUser(value))
    }, 300)
  }

  return (
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
  )
}

export default SearchIssueTracker
