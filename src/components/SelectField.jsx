import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'
const SelectField = ({ value, onChange, label, options, renderOptions }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        {options.map((item, idx) => (
          <Fragment key={idx}>{renderOptions(item)}</Fragment>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default SelectField
