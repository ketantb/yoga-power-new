import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Forgot from './views/pages/forgot/Forgot'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Page550 = React.lazy(() => import('./views/pages/page550/Page550'))


class App extends Component {
  render() {
    return (
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/forgot" name="Forgot Page" element={<Forgot />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/550" name="Page 550" element={<Page550 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
    )
  }
}
  
export default App