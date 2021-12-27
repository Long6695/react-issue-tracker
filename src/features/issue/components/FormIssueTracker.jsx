import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

// context
import { useIssueContext } from 'context/issueTrackerContext'
//libs
import { v4 as uuidv4 } from 'uuid'
// components
import TextField from 'components/TextField'
import IssueTrackerToast from './IssueTrackerToast'
import SelectField from 'components/SelectField'

const FormIssueTracker = () => {
  const { addIssue, isAddSuccess } = useIssueContext()
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

    addIssue(form)

    setForm({ id: uuidv4(), description: '', severity: 'low', status: 'new' })
  }

  const severityOptions = [
    {
      id: 1,
      label: 'Low',
      value: 'low',
    },
    {
      id: 2,
      label: 'Medium',
      value: 'medium',
    },
    {
      id: 3,
      label: 'High',
      value: 'high',
    },
  ]

  return (
    <>
      {isAddSuccess && (
        <IssueTrackerToast title="Add Successfully" color="text-success" />
      )}
      <Form onSubmit={handleSubmit} className=" border-bottom pb-4">
        <h1 className="text-center py-5 mb-0 fs-1 fw-light">Issue Tracker</h1>

        <TextField
          ErrorMessage="Please Enter Input"
          placeholder="Describe the issue..."
          isError={form.description === '' && isError}
          label="Description"
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

        <SelectField
          label="Severity"
          onChange={(e) =>
            setForm((prev) => {
              return {
                ...prev,
                severity: e.target.value,
              }
            })
          }
          value={form.severity}
          options={severityOptions}
          renderOptions={(item) => (
            <option value={item.value}>{item.label}</option>
          )}
        />
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
