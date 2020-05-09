import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/login/Login'
import Home from './components/home/Home'
import PrivateRoute from './auth/PrivateRoute'
import PublicRoute from './auth/PublicRoute'

function App(props) {

  return (
      <Router>
        <div>
          <PublicRoute exact path="/"component={Login}/>
          <PrivateRoute path="/home" component={Home}/>
          {/* <Route path="/home" component={Home} /> */}
          {/* <Route path="/signup" component={Signup} /> */}
        </div>
      </Router>
  )
}

export default App;
