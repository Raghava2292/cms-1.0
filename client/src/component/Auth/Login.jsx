import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Login(props) {
  const [user,setUser] = useState({
      email: "",
      password: ""
  })

  const navigate = useNavigate()

  const readValue = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value })
  }

  const submitHandler = async (e) => {
      e.preventDefault()
        try {
            console.log('user =', user)
            await axios.post(`/api/v1/auth/login`, user)
              .then(res => {
                  console.log('after login =', res);
                  localStorage.setItem("loginToken", true)
                  toast.success(res.data.msg);
                  navigate('/')
                  window.location.href = "/"
              }).catch(err => {
                toast.error(err.response.data.msg)
                // console.log('error =', err)
              });
        } catch (err) {
          toast.error(err.message)
        }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Login</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                  <form autoComplete="off" onSubmit={submitHandler}>

                      <div className="form-group mt-2">
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required />
                      </div>

                      <div className="form-group mt-2">
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" id="password" value={user.password} onChange={readValue} className="form-control" required />
                      </div>
                      <div className="form-group mt-2">
                          <input type="submit" value="Login" className="btn btn-success" />
                      </div>
                  </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login