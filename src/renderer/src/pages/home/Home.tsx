import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import Sidebar from '../../layout/sidebar/Sidebar'
import Navbar from '@renderer/layout/navbar/Navbar'
import { ToastContainer } from 'react-toastify'

function Home(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)

  return (
    <div className="parents flex h-screen overflow-hidden">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Contenu principal */}
      <div
        className={`flex flex-col flex-1 bg-[#E6E6FA] overflow-y-auto
          ${closeBar ? 'ml-[5rem]' : 'ml-[16rem]'} transition-all duration-[550ms] ease-in-out`}
      >
        <Navbar />
        <main className="flex-1" role="main" aria-label="Contenu principal">
          <Outlet />
        </main>
      </div>

      {/* Toast unique pour toute l'application */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  )
}

export default Home
