import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CInputGroup,
  CFormInput,
  CButton,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBasket,
  cilCalendar,
  cilCalendarCheck,
  cilClock,
  cilFingerprint,
  cilLinkAlt,
  cilMenu,
} from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, AppHeaderDropdownForm } from './header/index'
import logo from 'src/assets/images/avatars/YPI-Logo-2022.png'
import { AppHeaderDropdownBook, AppHeaderDropdownCheckIn, AppHeaderDropdownLink,AppHeaderAppointment,AppHeaderDropdownBasket,ReminderMessageDropdown } from './header/AppHeaderDropdown'
import { Link } from 'react-router-dom'
import GlobelSearchFilter from './GlobelsearcFilter/GlobelSearchFilter'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CAvatar src={logo} style={{ width: '170px' }} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {/* <CInputGroup className="ml-3"> */}
              {/* <CFormInput
                placeholder="Search.."
              />
              <CButton type="button" color="primary" id="button-addon2">
                Search
              </CButton> */}
            {/* </CInputGroup> */}
            <div style={{width:'300px'}}>
               <GlobelSearchFilter/>
            </div>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>

        <CNavItem>
            <CNavLink href='#'>
              <ReminderMessageDropdown/>
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink href='#'>
              <AppHeaderDropdownForm />
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink href="#">
              <AppHeaderDropdownBook />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <AppHeaderAppointment/>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <AppHeaderDropdownCheckIn />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <AppHeaderDropdownBasket/>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <AppHeaderDropdownLink />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader