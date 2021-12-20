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
  const [{ users, isDeleteSuccess }, dispatch] = useIssueTrackerContext()

  const handleDeleteUser = (id) => () => {
    dispatch(isShowDeleteUser())
    dispatch(deleteUser(id))
    setTimeout(() => {
      dispatch(isHideDeleteUser())
    }, 1000)
  }

  const handleChangeStatus = (status, id) => () => {
    dispatch(updateStatusUser(status, id))
  }

  return (
    <div>
      {isDeleteSuccess && (
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
                <Button
                  variant={
                    (item.status === 'new' && 'secondary btn-sm') ||
                    (item.status === 'open' && 'success btn-sm') ||
                    (item.status === 'close' && 'info text-light btn-sm')
                  }
                >
                  {item.status}
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title className="fs-4">{item.description}</Card.Title>
                <Card.Text>
                  <Button
                    className="btn-sm text-light"
                    variant={
                      (item.severity === 'high' && 'danger') ||
                      (item.severity === 'medium' && 'warning') ||
                      (item.severity === 'low' && 'dark')
                    }
                  >
                    {item.severity.replace(
                      item.severity.charAt(0),
                      item.severity.charAt(0).toUpperCase()
                    )}
                  </Button>
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button
                    className="me-3"
                    variant="primary"
                    onClick={handleChangeStatus(item.status, item.id)}
                  >
                    {item.status === 'new'
                      ? 'Open'
                      : item.status === 'open'
                      ? 'Close'
                      : 'Open'}
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
