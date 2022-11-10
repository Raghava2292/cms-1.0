import React, {useContext} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {DataContext} from '../../GlobalContext'
import axios from 'axios'
import {toast} from 'react-toastify'

function Menu() {
    const context = useContext(DataContext)
    const [isLogged, setIsLogged] = context.data.authApi.isLogged
    const [isAdmin, setIsAdmin] = context.data.authApi.isAdmin
    const [isStudent, setIsStudent] = context.data.authApi.isStudent
    const [isTrainer, setIsTrainer] = context.data.authApi.isTrainer
    const [currentUser] = context.data.authApi.currentUser

    const navigate = useNavigate()

    const logoutUser = async () => {
        if(window.confirm(`Are you sure to logout?`)) {
            const res = await axios.get(`api/v1/auth/logout`);
                localStorage.clear();
                if(isAdmin) setIsAdmin(false)
                if(isStudent) setIsStudent(false)
                if(isTrainer) setIsTrainer(false)
                setIsLogged(false)
                toast.success(res.data.msg);
                window.location.href = '/';
        } else {
            return;
        }
    }

    // common route
    const commonRoute = () => {
        return (
            <ul className='navbar-nav'>
                <li className="nav-item dropdown">
                    <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        Account
                    </NavLink>
                    <ul className="dropdown-menu">
                    <li>
                        {
                            isAdmin ? <NavLink to={`/admin/profile`} className="dropdown-item">Profile</NavLink> : null
                        }
                        {
                            isStudent ? <NavLink to={`/student/profile`} className="dropdown-item">Profile</NavLink> : null
                        }
                        {
                            isTrainer ? <NavLink to={`/trainer/profile`} className="dropdown-item">Profile</NavLink> : null
                        }
                    </li>
                    <li>
                        {
                            isAdmin ? <NavLink to={`/admin/dashboard`} className="dropdown-item">Dashboard</NavLink> : null
                        }
                        {
                            isStudent ? <NavLink to={`/student/dashboard`} className="dropdown-item">Dashboard</NavLink> : null
                        }
                        {
                            isTrainer ? <NavLink to={`/trainer/dashboard`} className="dropdown-item">Dashboard</NavLink> : null
                        }
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                        <NavLink to={`/`} onClick={logoutUser} className="dropdown-item text-white">Logout</NavLink>
                    </li>
                </ul>
                </li>
                
            </ul>
        )
    }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <div className="container">
            <NavLink to={`/`} className="navbar-brand">
                {
                    isLogged ? (
                        <React.Fragment>
                            { isAdmin ? "Admin-CMS-v1.0" : null }
                            { isStudent ? "Student-CMS-v1.0" : null }
                            { isTrainer ? "Trainer-CMS-v1.0" : null }
                        </React.Fragment>
                    ) : "CMS-v1.0"
                }
            </NavLink>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="menu">
                {
                    isLogged ? null : (
                        <nav className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={`/`} className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`/about`} className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`/contact`} className="nav-link">Contact</NavLink>
                            </li>
                        </nav>
                    )
                }
                {
                    isLogged ? commonRoute(): (
                        <nav className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={`/login`} className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/register`}>Register</NavLink>
                            </li>
                        </nav>
                    )
                }
            </div>
        </div>
    </nav>
  )
}

export default Menu