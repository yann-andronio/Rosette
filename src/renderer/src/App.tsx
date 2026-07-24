
import { useContext } from 'react'
import { Outlet} from 'react-router-dom'
import { UserProvider } from './context/UserContext'

import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
 <Outlet />
      
  
    </>
  )
}

export default App
