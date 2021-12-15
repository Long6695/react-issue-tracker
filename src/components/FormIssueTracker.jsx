import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import IssueTrackerToast from './IssueTrackerToast'
import {
  addUser,
  isShowLoadingUser,
  isHideLoadingUser,
} from '../store/reducer/issueTrackerReducer'
import { useIssueTrackerContext } from '../store/context/issueTrackerContext'
import { v4 as uuidv4 } from 'uuid'
const FormIssueTracker = () => {
  const [{ isLoading }, dispatch] = useIssueTrackerContext()
  const [isError, setIsError] = useState(false)
  const [form, setForm] = useState({
    id: uuidv4(),
    description: '',
    severity: 'low',
    status: 'new',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    form.description === '' ? setIsError(true) : setIsError(false)
    if (form.description === '') return
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
        <IssueTrackerToast title="Add Successfully" color="text-success" />
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
          {form.description === '' && isError && (
            <p className="text-center fs-5 text-danger">Please Enter Input</p>
          )}
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
