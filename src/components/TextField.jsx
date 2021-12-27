import React from 'react'
import { Form } from 'react-bootstrap'
const TextField = ({
  label,
  value,
  onChange,
  isError,
  ErrorMessage,
  placeholder,
}) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isError && (
        <p className="text-center fs-5 text-danger">{ErrorMessage}</p>
      )}
    </Form.Group>
  )
}

export default TextField
