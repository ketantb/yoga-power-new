import { CContainer} from '@coreui/react'
const WelcomePage = () => {


  let user = JSON.parse(localStorage.getItem('user-info'))

  console.log(user)

  return (
    <CContainer color='warning h-100 w-100 '>
      <div className="row">
        <div className="col text-center my-5">
          <h1>Welcome to Your Dashboard</h1>
          <p>Start managing your Rental ERP Service </p>
        </div>
      </div>
    </CContainer>
  )
}

export default WelcomePage
