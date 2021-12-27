import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const IssueTrackerToast = ({ title, color }) => {
  return (
    <ToastContainer
      className="position-fixed"
      position="top-end"
      style={{ zIndex: '1000' }}
    >
      <Toast delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className={`"me-auto" ${color}`}>{title}</strong>
          <small>Just a second</small>
        </Toast.Header>
        <Toast.Body>Have a nice day!!!</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default IssueTrackerToast
