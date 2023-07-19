import React, { useEffect,useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector ,useDispatch} from 'react-redux'

import { CBadge } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  let user = JSON.parse(localStorage.getItem('user-info'))

  const data = useSelector((el)=>el.empLoyeeRights)  
  const disPatch = useDispatch()
  const [arr1,setArr1] = useState([...items])
  const [viewNav,setViewNav] = useState(false)

  const isAdmin = user?.user?.isAdmin;  
  const arr2 = (data?.crmRights && data?.erpRights    ) ?{...data?.erpRights,...data?.crmRights}:{}

  // const arr2 = (data?.crmRights && data?.erpRights && data?.masterRights) ?{
  //   ...data?.erpRights,
  //   ...data?.crmRights,
  //   ...data?.masterRights
  // }:{}

  const arr =items

  

const updatete = ()=>{
if(!isAdmin){
items?.forEach((el,i)=>{

  if(!!arr2[el?.id]){// // lavel 1
    const secondObj = arr2[el?.id]

  if(secondObj?.value){
  if(secondObj?.items && el?.items){ 
     el?.items?.forEach((el2,i2)=>{
     const secondObj2 = secondObj?.items[el2?.id]?.items
      if(!secondObj?.items[el2?.id]?.value){      // lavel 2
            el?.items?.splice(i2,1)
            delete secondObj?.items[el2?.id]
      }  
      if(el2?.items&&secondObj2){   // lavel 3
        el2?.items?.forEach((el3,i3)=>{
          if(!secondObj2[el3?.id]?.value){
            el2?.items?.splice(i3,1)
            delete secondObj2[el3?.id]
          }    
      })
      }
  }) 
  }}else if(!arr2[el?.id]?.value && !(el?.id ==='masterCenterPartners'&& isAdmin)){
    items?.splice(i,1)
  delete arr2[el?.id]
  }
}

  if(items.length===i+1&&!viewNav){
   setViewNav(true)
  }
}
)} else if(!viewNav){
  setViewNav(true)
  items = arr
}
}


useEffect(()=>{
  if(items.length&& arr2){
    updatete()
    setArr1([...items])
  }
},[user?.emailUniqId,items?.length,arr2?.length])


  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to && !rest.items && { component: NavLink })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      { viewNav &&
         arr1.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
