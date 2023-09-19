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
                Duplicate Value found please enter different value and try again 
              </p>
            </span>
            
          </CCol>
        </CRow>

    </CModalBody>
  </CModal>

  const toHandleStatus = (res)=>{
    setVisibleModel(true)
    setStatusCode(res.response.status)
  }

  return {toHandleStatus,errorCompponent,statusCode}

}

const useResponseStatus = () => {
    return (
      <div>
        
      </div>
    )
}

const useDeletConfermation = ()=>{
    return (
        <div>

        </div>
    )
}


export  {useErrorStatus,useResponseStatus}
