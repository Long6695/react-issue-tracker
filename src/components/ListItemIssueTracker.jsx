import React from 'react'
import { Card, Button } from 'react-bootstrap'
import IssueTrackerToast from './IssueTrackerToast'
import { useIssueTrackerContext } from '../store/context/issueTrackerContext'
import {
  deleteUser,
  isShowDeleteUser,
  isHideDeleteUser,
  updateStatusUser,
} from '../store/reducer/issueTrackerReducer'
const ListItemIssueTracker = () => {
  const [{ users, isDelete }, dispatch] = useIssueTrackerContext()

  const handleDeleteUser = (id) => () => {
    dispatch(isShowDeleteUser())
    dispatch(deleteUser(id.toString()))
    setTimeout(() => {
      dispatch(isHideDeleteUser())
    }, 1500)
  }

  const handleChangeStatus = (id) => () => {
    dispatch(updateStatusUser(id))
  }

  return (
    <div>
      {isDelete && (
        <IssueTrackerToast title="Delete Successfully" color="text-danger" />
      )}
      {(users.length === 0 && (
        <Card className="w-100 mb-5 text-center" style={{ width: '18rem' }}>
          <Card.Header>
            <span className="me-3 fs-3 text-danger">No Items</span>
          </Card.Header>
        </Card>
      )) ||
        (users.length > 0 &&
          users.map((item) => (
            <Card
              className="w-100 mb-5"
              style={{ width: '18rem' }}
              key={item.id}
            >
              <Card.Header>
                <span className="me-3">{item.id}</span>
                <Button variant="dark btn-sm">{item.status}</Button>
              </Card.Header>
              <Card.Body>
                <Card.Title className="fs-4">{item.description}</Card.Title>
                <Card.Text>
                  <Button className="btn-sm" variant="primary">
                    {item.severity}
                  </Button>
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button
                    className="me-3"
                    variant="primary"
                    onClick={handleChangeStatus(item.id)}
                  >
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleDeleteUser(item.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )))}
    </div>
  )
}

export default ListItemIssueTracker
