import React, { useState } from 'react'
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap'
import {
  addUser,
  isShowLoadingUser,
  isHideLoadingUser,
} from '../store/reducer/issueTrackerReducer'
import { useIssueTrackerContext } from '../store/context/issueTrackerContext'
import { v4 as uuidv4 } from 'uuid'
const FormIssueTracker = () => {
  const [{ isLoading }, dispatch] = useIssueTrackerContext()
  const [form, setForm] = useState({
    id: uuidv4(),
    description: '',
    severity: 'low',
    status: 'new',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(isShowLoadingUser())
    setForm({ id: uuidv4(), description: '', severity: 'low', status: 'new' })

    setTimeout(() => {
      dispatch(isHideLoadingUser())
    }, 1500)

    dispatch(addUser(form))
  }

  return (
    <>
      {isLoading && (
        <ToastContainer className="position-fixed" position="top-end">
          <Toast delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto text-success">Add Successfully</strong>
              <small>Just a second</small>
            </Toast.Header>
            <Toast.Body>Have a nice day!!!</Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      <Form onSubmit={handleSubmit} className=" border-bottom pb-4">
        <h1 className="text-center py-5 mb-0 fs-1 fw-light">Todo Tracker</h1>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Describe the issue..."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                }
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Severity</Form.Label>
          <Form.Select
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  severity: e.target.value,
                }
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-end align-items-center ">
          <Button variant="primary" type="submit">
            Add
          </Button>
        </div>
      </Form>
    </>
  )
}

export default FormIssueTracker
