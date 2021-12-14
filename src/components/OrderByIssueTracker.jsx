import React from 'react'
import { Form } from 'react-bootstrap'
const OrderByIssueTracker = () => {
  return (
    <div className="row mt-5 mb-5">
      <h4 className="col-2 fw-light fs-5">Order By:</h4>
      <div className="col-2">
        <Form.Select>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </Form.Select>
      </div>
    </div>
  )
}

export default OrderByIssueTracker
