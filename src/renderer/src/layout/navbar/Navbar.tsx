import { Fragment, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import { useDispatch } from 'react-redux'
import { toggleCloseBar } from '../../redux/slice/activeLinkSlice'
import { AiOutlineMenu } from 'react-icons/ai'
import { UserProvider } from '@renderer/context/UserContext'
import ProfileModal from '@renderer/components/modalv2/profil/ProfileModal'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { axiosRequest } from '@renderer/config/helpers'

export default function Navbar(){
  const dispatch = useDispatch()
  const activeName = useSelector((state: RootState) => state.activeLink.activeName)
  const { user, setUser } = useContext(UserProvider)
  const { openModal, modal, closModal } = useMultiModals()

  const getUser = async () => {
    try {
      await axiosRequest('GET', 'user', null)
        .then(({ data }) =>
          setUser({
            email: data?.email,
            id: data.id,
            name: data?.name,
            role: data?.roles?.role_name,
            firstname: data?.firstname,
            has_access: data?.roles?.pages
          })
        )
    } catch (error) {
      console.error('Erreur de récupération utilisateur :', error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : '?'

  return (
    <Fragment>
      <header
        className="navbar flex justify-between bg-white/80 backdrop-blur-xl w-full pr-6 pl-4 py-2.5 items-center shadow-sm border-b border-white/60 sticky top-0 z-30"
        role="banner"
      >
        {/* Gauche : burger + nom de page */}
        <div className="flex items-center gap-4">
          <button
            aria-label={`${true ? 'Ouvrir' : 'Fermer'} le menu de navigation`}
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-[#7A3B3F] transition-colors focus-visible:ring-2 focus-visible:ring-[#7A3B3F]"
            onClick={() => dispatch(toggleCloseBar())}
          >
            <AiOutlineMenu size={22} aria-hidden="true" />
          </button>
          <h1 className="text-base font-semibold text-gray-800 tracking-wide">{activeName}</h1>
        </div>

        {/* Droite : avatar utilisateur */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal('profilModal')}
            aria-label={`Ouvrir le profil de ${user?.name ?? 'l\'utilisateur'}`}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3B3F] rounded-xl p-1"
          >
            <span
              className="h-10 w-10 rounded-full text-white bg-[#7A3B3F] flex items-center justify-center text-sm font-bold
                group-hover:opacity-90 group-hover:scale-105 transition-all duration-200 shadow-md"
              aria-hidden="true"
            >
              {initials}
            </span>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </button>
        </div>
      </header>

      {modal.profilModal && (
        <ProfileModal user={user} onClose={() => closModal('profilModal')} />
      )}
    </Fragment>
  )
}

