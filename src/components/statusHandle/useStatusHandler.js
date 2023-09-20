import React from 'react'
import { CModal,CModalHeader,CModalTitle,CModalBody,CRow,CCol } from '@coreui/react'
import { useState } from 'react'

const useErrorStatus = () => {


    const [statusCode,setStatusCode] = useState(0)
    const [renderErrorMessage,setRenderErrorMessage] = useState("")
    const [visibaleModel,setVisibleModel] = useState(false)


    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;


    const errorCompponent = <CModal
    size="md"
    visible={visibaleModel}
    onClose={() =>{ setVisibleModel(false)
        setStatusCode(0)
    }}
    aria-labelledby="FullscreenExample3"
  >
    <CModalHeader>
      <CModalTitle id="FullscreenExample3">Woo hoo!</CModalTitle>
    </CModalHeader>
    <CModalBody>
    <CRow className="justify-content-center">
          <CCol >
            <span className="clearfix">
              <h1 className="float-start text-danger display-3 me-4">{statusCode}</h1>
              <h4 className="pt-3 text-danger"> error {username}, we have a problem!</h4>
              <h6 className="pt-3 text-info">Client side error</h6>
              <p className="text-medium-emphasis float-start  text-danger">
                Duplicate Contact number found please enter different Contact number and try again 
              </p>
            </span>
            
          </CCol>
        </CRow>

    </CModalBody>
  </CModal>

  const toHandleStatus = (statusCode)=>{
    if(statusCode===422){
        setVisibleModel(true)
        setStatusCode(statusCode)
    }
  }

  return {toHandleStatus,errorCompponent,statusCode}

}



export  {useErrorStatus}
