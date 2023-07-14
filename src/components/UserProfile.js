import { CCard, CRow,CCol, CAvatar,CButton,CFormInput,CFormTextarea } from '@coreui/react'
import React,{useEffect, useState} from 'react'

import avatar8 from './../assets/images/avatars/profile_icon.png'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { TbPlayerTrackNext, TbPlayerTrackPrev} from 'react-icons/tb';
import {BsLink} from 'react-icons/bs';
import { storage } from "src/firebase";
import {getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";


const UserProfile = () => {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
    const token = user.token;
    const email = user.user.email;
    const emailUniqId = user.user.emailUniqId;
    const brandLogo = user.user.brandLogo;


    const url =useSelector(el=>el.domainOfApi)
    const [userInfo,setStateInfo] = useState({})
    const [toEdit,setEdit] = useState(false)
    const [socialAccount,setSocilaAccount] = useState(1)
    const [profile,setProfile] = useState(false)

    const [imageUrl, setImageUrl] = useState('')
    const [imgPrograss,setImgPrograss] = useState(0)
    const obj = {
      empName:``,
      aboutUser:``,
      profileLogo:imageUrl,
      linkInfoArr:[
      {linkName:'',link:''},
      {linkName:'',link:''},
      {linkName:'',link:''},
      {linkName:'',link:''}
    ]
  }

    const [socalMeadiaInfoArr,setSocalMeadiaInfoArr] =useState({...obj})

    const headers = {
      "Authorization": `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
  

   const getEmailFullData = async  ()=>{
     axios.get(`${url}/signup/emailId/${emailUniqId}`)
    .then((el)=>{
        if(el.status===200){


          setProfile(el.status===200)
          setStateInfo(el.data)
          setSocalMeadiaInfoArr(prev=>{
            if(!el?.data?.aboutUser?.trim()){
              prev.aboutUser=`Hii There i am ${el?.data?.empName} Live in ${el?.data?.country} ${el?.data?.city}`
            }else{
              prev.aboutUser =  el?.data?.aboutUser   
            }
            prev.linkInfoArr = el?.data?.linkInfoArr
            prev.empName = el?.data?.empName   
            prev.profileLogo = el?.data?.profileLogo       
    

            return {...prev}
          })
        }         
    })
   }

   useEffect(()=>{
     getEmailFullData()
   },[])


  function createLead() {
     
        axios.patch(`${url}/signup/update/logo/${emailUniqId}`, socalMeadiaInfoArr, { headers })
            .then((resp) => {
              if(resp.status===200){
                alert('Successfully Added')
                getEmailFullData()
                setEdit(false)
              }
            })
            .catch((error) => console.log(error))
    
}

const handleChange = event => {
  const fileUploaded = event.target.files[0];
  const file = event.target.files[0]

   
      const uploadImage = (file)=>{
        if(!fileUploaded)return
       const storageRef =   ref(storage,`center-partner-prifile-photo/${fileUploaded.name}`)
       const uploadTask = uploadBytesResumable(storageRef,fileUploaded)

       uploadTask.on("state_changed",(snapshot)=>{
        const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
        setImgPrograss(prog)

       },(error)=>{
        console.log(error)
       },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          setSocalMeadiaInfoArr(prev=>{
            prev.profileLogo = url
            return {...prev}
          })
        })
       }
       )
      }
      uploadImage(file)
};  



  return (
    profile&& <CCard className='p-2'>
     <CRow>
     
     <CCol style={{maxWidth:'fit-content'}} style={{maxWidth:'400px'}}>

     <CCol className='text-center' style={{ minWidth:'350px'}}>
            <CCard className='p-4'>
               <div className='border border-dark border-2'   style={{height:'180px',width:'180px', 
                backgroundImage:`url(${avatar8})`,
                backgroundSize:'130%',
                backgroundPosition:'center',
                margin:'auto',
                borderRadius:'50%',
                overflow:'hidden'
               }}
               >
                <img src={socalMeadiaInfoArr.profileLogo} alt="image not loaded" style={{
                  width:'100%',
                  height:'100%',
                  objectFit:'fill'
                  }} />
               </div>
                       
            <h5 className='mb-3' >{socalMeadiaInfoArr.empName}</h5>   
            <h5 className='mb-3' style={{fontWeight:'lighter'}} >{email}</h5>   

               
               {<CButton style={{display:!toEdit?'block':'none'}} onClick={()=>setEdit(true)} color='dark' variant='outline'>Edit Profile</CButton>} 

               {<div style={{display:toEdit?'block':'none'}} className='mt-2' className='text-start'> 
                <CFormInput
                 label={`User Name`}
                 value={socalMeadiaInfoArr.empName}
                 className='mb-2'
                 type='text'
                 onChange={(e)=>setSocalMeadiaInfoArr(prev=>{
                  prev.empName = e.target.value
                  return {...prev}
                })}
                />
                  <CFormInput
                 label={`Upload A New Image ${imgPrograss}%`}
                 type='file'
                 onChange={handleChange}
                />
                <h5 className='mt-3'>Social accounts {socialAccount===1?'Link':"Name"}</h5>

                <div style={{display:socialAccount===1?'block':"none"}} >
                  {
                       socalMeadiaInfoArr.linkInfoArr.map((el,i)=>{
                    return     <CFormInput
                    className={(2%(i))===0?'my-2':''}
                    value={el.link}
                    onChange={(e)=>{
                      setSocalMeadiaInfoArr(prev=>{
                        prev.linkInfoArr[i].link = e.target.value
                        return {...prev}
                      })
                    }}
                    type='text'/>
                       })
                  }
                </div>
                <div  style={{display:socialAccount===2?'block':"none"}}>
                {
                  socalMeadiaInfoArr.linkInfoArr.map((el,i)=>{
                    return     <CFormInput
                    className={(2%(i))===0?'my-2':''}
                    value={el.linkName}
                    onChange={(e)=>{
                      setSocalMeadiaInfoArr(prev=>{
                        prev.linkInfoArr[i].linkName = e.target.value
                        return {...prev}
                      })
                    }}
                    type='text'/>
                       })
                  }
                </div>
                <div className='d-flex justify-content-between'>
                <CButton className='my-2'  style={{display: socialAccount===2 ?'inline-block':'none'}} onClick={()=>setSocilaAccount(1)}><TbPlayerTrackPrev/></CButton>
                <CButton className='my-2' onClick={()=>setSocilaAccount(2)}><TbPlayerTrackNext/></CButton>
                </div>

                 <div className='text-end'>
                  <CButton color='danger' className='me-2' onClick={()=>{
                    setEdit(false)
                  }}> Close</CButton>
                  <CButton onClick={()=>createLead()}> Save</CButton>

                 </div> 
               </div>
               }
                 
               {
                userInfo?.linkInfoArr?.filter((el)=>{
                  if(el.linkName.trim()&&el.link.trim() && !toEdit){
                    return true
                  }
                  return false
                })?.map((el,i)=>{

                  return <CCard className='my-2 text-start '>
                    <div className='d-flex px-2'>
                    <BsLink style={{fontSize:'30px'}}/>
                    <a style={{fontSize:'25px'}} className='m-0 mx-4 p-0' href={el.link} style={{textDecoration:'none'}}>
                      {el.linkName}
                    </a>
                    </div>
                   </CCard>

                })
               }  
 


            
 
            </CCard>

       </CCol>
                 
     </CCol>

     <CCol>
     <CCard className='p-4 text-end' >
               <h5  style={{fontWeight:'400'}}>Persional Information / Center Information  </h5>
               <div style={{width:'200px'}} className='text-end'>
                  <img width='100%' src={brandLogo}/>
               </div>
    <CRow className='mt-2'>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
                City: <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.city}</p>
              </h6>  
        </CCol>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
                Country: <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.country}</p>
              </h6>  
        </CCol>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
             Center : <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.center}</p>
              </h6>  
        </CCol>
    </CRow>  
       
    <CRow className='mt-2'>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
             Center Code: <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.centerCode}</p>
              </h6>  
        </CCol>
        <CCol>
              <h6 style={{fontWeight:'400'}} className='d-flex'>
              Designation <p className='ms-3 me-4' style={{fontWeight:'300'}} >{!userInfo?.Designation?.trim()?userInfo.typeOfPartner:userInfo.Designation}</p> 
              </h6> 
        </CCol>
      
    </CRow>  
         <CCol>
              <h6 style={{fontWeight:'400'}} className='d-flex'>
              Created At <p className='ms-3 me-4' style={{fontWeight:'300'}} >{new Date(userInfo.createdAt).toDateString()}</p> 
              </h6> 
        </CCol>

    </CCard>

      <CCard className='p-4 mt-2'>
 
        <h5> About</h5>

        {!toEdit&&<p>{socalMeadiaInfoArr.aboutUser}</p>}

        {toEdit&&<div>  
          <CFormTextarea
          value={socalMeadiaInfoArr.aboutUser}
          onChange={(e)=>setSocalMeadiaInfoArr(prev=>{
            prev.aboutUser = e.target.value
            return {...prev}
          })}
          rows={4}
          >          


          </CFormTextarea>
        </div>}
      </CCard>

     </CCol>





      
     </CRow>
    </CCard>
  )
}

export default UserProfile


 {/* <CCol className='text-center' style={{maxWidth:'fit-content' , minWidth:'350px'}}>
            <CCard className='p-4'>
               <CAvatar className='border border-dark border-2'   style={{height:'180px',width:'180px', 
                backgroundImage:`url(${avatar8})`,
                backgroundSize:'130%',
                backgroundPosition:'center',
                margin:'auto'
               }}
            
               />
                       
            <h5 className='mb-3' >{username}</h5>   
            <h5 className='mb-3' style={{fontWeight:'lighter'}} >{email}</h5>   

               <CButton color='dark' variant='outline'>Edit Profile</CButton> 

               <div className='mt-2' className='text-start'> 
                <CFormInput
                 label={`User Name`}
                />
               </div>

               <div className='mt-2' className='text-start'> 
                <CFormInput
                 label={`Upload A Image `}
                 type='file'
                />
               </div>
 
            </CCard>

       </CCol>



        <CCol>
            <CCard className='p-4 text-end' >
               <h5  style={{fontWeight:'400'}}>Persional Information / Center Information  </h5>
               <div style={{width:'200px'}} className='text-end'>
                  <img width='100%' src={brandLogo}/>
               </div>
    <CRow className='mt-2'>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
                City: <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.city}</p>
              </h6>  
        </CCol>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
                Country: <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.country}</p>
              </h6>  
        </CCol>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
             Center : <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.center}</p>
              </h6>  
        </CCol>
    </CRow>  
       
    <CRow className='mt-2'>
        <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
             Center Code: <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.centerCode}</p>
              </h6>  
        </CCol>
        <CCol>
              <h6 style={{fontWeight:'400'}} className='d-flex'>
              Created At <p className='ms-3 me-4' style={{fontWeight:'300'}} >{new Date(userInfo.createdAt).toDateString()}</p> 
              </h6> 
        </CCol>
      
    </CRow>  
    <CRow>
    <CCol>
             <h6 style={{fontWeight:'400'}} className='d-flex'>
             Address: <p className='ms-3 me-4' style={{fontWeight:'300'}}>{userInfo.location}</p>
              </h6> 
              <div className='d-flex justify-content-end'>
            
              <h6 style={{fontWeight:'400'}} className='text-start'>
                Cotact No <p style={{fontWeight:'300'}}>{userInfo.mobNo}</p> 
              </h6>
             </div>  
             
        </CCol>
    </CRow>

            </CCard>           
        </CCol>
     </CRow>
     <CRow className='mt-2'> */}


    
//      <CCol md={4}  style={{minWidth:'350px',boxSizing:'border-box'}}>
//      <div className='p-4'>
//        <a href='#'>husnainabdi2331@gmail.com</a>
//      </div>
//  </CCol>
//  <CCol>
//      <CCard className='p-4'>
//        <h5> About</h5>
//        Hii There i am {username} Live in {userInfo.country} {userInfo.city}
//      </CCard>
//  </CCol>