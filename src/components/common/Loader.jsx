import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
        <div className='d-flex justify-content-center align-items-center'>
            <Spinner animation="border" variant="primary" />
            <h4 className="ms-2 fw-bold text-muted">Loading...</h4>
        </div>
    </>
  )
}

export default Loader