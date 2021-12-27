import React from 'react'
import { Button } from 'react-bootstrap'
import { useIssueContext } from 'context/issueTrackerContext'
const FilterIssueTracker = () => {
  const { setIsFilterBy } = useIssueContext()

  const handleChangeStatus = (status) => () => {
    setIsFilterBy(status)
  }

  return (
    <div className="row mt-5">
      <h4 className="col-2 fw-light fs-5">Filter:</h4>
      <div className="col-10">
        <Button
          className="me-2 btn-sm"
          variant="primary"
          onClick={handleChangeStatus('all')}
        >
          All
        </Button>
        <Button
          className="me-2 btn-sm"
          variant="success"
          onClick={handleChangeStatus('open')}
        >
          Open
        </Button>
        <Button
          className="me-2 btn-sm text-white"
          variant="info"
          onClick={handleChangeStatus('close')}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export default FilterIssueTracker
