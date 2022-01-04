import React from 'react'
//libs
import { Card, Button, Spinner } from 'react-bootstrap'
// context
import { useIssueContext } from 'context/issueTrackerContext'

//components
import IssueTrackerToast from './IssueTrackerToast'

const ListItemIssueTracker = () => {
  const {
    deleteIssue,
    isDeleteSuccess,
    updateStateIssue,
    isFilteredIssues,
    pageEnd,
    loading,
  } = useIssueContext()

  const handleDeleteUser = (id) => () => {
    deleteIssue(id)
  }

  const handleChangeStatus = (status, id) => () => {
    status = status === 'new' || status === 'close' ? 'open' : 'close'
    updateStateIssue(status, id)
  }

  return (
    <div>
      {isDeleteSuccess && (
        <IssueTrackerToast title="Delete Successfully" color="text-danger" />
      )}
      {(isFilteredIssues.length === 0 && (
        <Card className="w-100 mb-5 text-center" style={{ width: '18rem' }}>
          <Card.Header>
            <span className="me-3 fs-3 text-danger">No Items</span>
          </Card.Header>
        </Card>
      )) ||
        (isFilteredIssues.length > 0 &&
          isFilteredIssues.map((item) => (
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
                    {item.severity}
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
      <div ref={pageEnd} className="text-center mb-5">
        {loading && (
          <>
            <Spinner animation="grow" variant="primary" size="sm" />{' '}
            <Spinner animation="grow" variant="primary" size="sm" />{' '}
            <Spinner animation="grow" variant="primary" size="sm" />
          </>
        )}
      </div>
    </div>
  )
}

export default ListItemIssueTracker
