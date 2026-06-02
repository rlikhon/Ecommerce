import React from 'react'
import Layout from './common/Layout'

const Confirmation = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Thank you for your order!</h4>
          </div>          
          <div className="col-md-12 col-lg-12">
            <div className="row">               
              <div className="card shadow">
                <div className="card-body p-4">
                  <p className="text-center">Thank you for your order! Your order has been placed successfully!</p>
                  <p className="text-center">We will notify you once your order is shipped.</p>
                  <div className="text-center mt-3">
                    <a href="/" className="btn btn-primary">Continue Shopping</a>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Confirmation