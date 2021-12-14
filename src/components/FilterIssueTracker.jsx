import React from 'react'
import { Button } from 'react-bootstrap'
const FilterIssueTracker = () => {
  return (
    <div className="row mt-5">
      <h4 className="col-2 fw-light fs-5">Filter:</h4>
      <div className="col-10">
        <Button className="me-2 btn-sm" variant="primary">
          All
        </Button>
        <Button className="me-2 btn-sm" variant="success">
          Open
        </Button>
        <Button className="me-2 btn-sm text-white" variant="info">
          Close
        </Button>
      </div>
    </div>
  )
}

export default FilterIssueTracker
