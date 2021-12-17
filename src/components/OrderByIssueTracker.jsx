import React from 'react'
import { Form } from 'react-bootstrap'
import { orderByCharacter } from '../store/reducer/issueTrackerReducer'
import { useIssueTrackerContext } from '../store/context/issueTrackerContext'
const OrderByIssueTracker = () => {
  const [, dispatch] = useIssueTrackerContext()

  // useEffect(() => {
  //   console.log('abc')
  //   dispatch(orderByCharacter('asc'))
  // }, [dispatch])

  const handleOrderByCharacter = (e) => {
    dispatch(orderByCharacter(e.target.value))
  }

  return (
    <div className="row mt-5 mb-5">
      <h4 className="col-2 fw-light fs-5">Order By:</h4>
      <div className="col-2">
        <Form.Select onChange={handleOrderByCharacter}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </Form.Select>
      </div>
    </div>
  )
}

export default OrderByIssueTracker
