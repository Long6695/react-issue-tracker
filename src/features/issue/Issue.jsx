import React, {useRef, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'

import FormIssueTracker from 'features/issue/components/FormIssueTracker'
import ListIssueTracker from 'features/issue/components/ListIssueTracker'

import { useIssueContext } from 'context/issueTrackerContext'
const Issue = () => {
  const spinnerRef = useRef()

  const {loading, setPageNumber} = useIssueContext()

  useEffect(() => {
    if(!spinnerRef.current) return;

    let observerRefValue = null

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver((entries)=>{
      if(!entries[0].isIntersecting) return
      setPageNumber(prev => prev + 1)
    }, options)

    let refValue = spinnerRef.current

    observer.observe(refValue)
    observerRefValue = refValue

    return () => {
      if(observerRefValue) {
        observer.unobserve(refValue)
      }
    }
  },[setPageNumber])

  return (
    <>
      <FormIssueTracker />
      <ListIssueTracker />

      <div ref={spinnerRef} className="text-center mb-5">
        {loading && (
          <>
            <Spinner animation="grow" variant="primary" size="sm" />{' '}
            <Spinner animation="grow" variant="primary" size="sm" />{' '}
            <Spinner animation="grow" variant="primary" size="sm" />
          </>
        )}
      </div>
    </>
  )
}

export default Issue
