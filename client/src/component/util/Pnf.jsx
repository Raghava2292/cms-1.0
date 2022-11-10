import React from 'react'
import {NavLink} from 'react-router-dom' 

function Pnf() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-danger">Page Not Found</h3>
                <h5 className="text-warning display-5">404 Error</h5>
                <NavLink to={`/`} className="btn btn-outline-success">Back to Home</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Pnf