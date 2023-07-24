import React, { Suspense, useEffect,useState } from 'react'
import { Navigate, Route, Routes,useParams,Outlet } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
// routes config
import routes from '../routes'

const AppContent = ({params }) => {

  const Page500 = React.lazy(() => import('../../src/views/pages/page500/Page500'))


  const routesEl = routes.map((route, idx) => {
    return (
      route.element && (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          element={<route.element/>}
          errorElement={<Page500/>}
        />
      )
    )
  })
  const [routessC,setRoutes] = useState(routesEl)

 

  useEffect(()=>{
  setRoutes([...routesEl])
  },[params['*']])


  console.log(routesEl)
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes  >
          {routes.map((route, idx) => {
    return (
      route.element && (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          element={<route.element/>}
          errorElement={<Page500/>}

        />
      )
    )
  })}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard" replace />}  errorElement={<Page500/>} />
        </Routes>
      </Suspense>
      {/* {<Outlet/>} */}

    </CContainer>
  )
}

export default AppContent




