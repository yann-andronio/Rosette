import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import Sidebar from '../../layout/sidebar/Sidebar'
import Navbar from '@renderer/layout/navbar/Navbar'

function Home(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)

  return (
    <div className="parents flex h-screen">
      <div
        className={`bg-gray-800 fixed top-0 left-0 min-h-screen flex flex-col items-center p-7  
            ${closeBar ? 'w-[5rem]' : 'w-[16rem]'} transition-width  duration-[600ms] ease-in-out`}
      >
        <Sidebar />
      </div>

      <div
        className={`Rigth flex flex-col bg-[#E6E6FA] w-[100%] ${closeBar ? 'ml-16' : 'ml-60 '} transition-all duration-[600ms] ease-in-out`}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Home
