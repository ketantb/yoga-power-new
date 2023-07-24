import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CAvatar,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'


import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { hexToRgba } from '@coreui/utils'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  let user = JSON.parse(localStorage.getItem('user-info'))
  const logo = user.user.brandLogo;

  const [logoImg,setLogo] = useState(logo)

  useEffect(()=>{
    setLogo(logo)
  },[user.user.emailUniqId])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      style={{
        backgroundColor: hexToRgba('#0B5345'),
      }}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand to="/" style={{overflow:'hidden'}}>
        <CAvatar src={logoImg}  style={{width:'90%'}} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
