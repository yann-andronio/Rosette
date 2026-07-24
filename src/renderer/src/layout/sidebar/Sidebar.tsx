import { resetActiveName, setActiveName } from '@renderer/redux/slice/activeLinkSlice'
import { RootState } from '@renderer/redux/Store'
import { useState, useEffect, useContext } from 'react'
import { LuLayoutDashboard, LuGraduationCap } from 'react-icons/lu'
import { MdWorkOutline } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../images/logo/logo4.png'
import { FiLogOut } from 'react-icons/fi'
import { MdSettings } from 'react-icons/md'
import s from './sidebar.module.css'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { MdAssignment } from 'react-icons/md'
import { BsCash } from 'react-icons/bs'
import { HiUserCircle } from 'react-icons/hi'
import { FaCoins, FaHistory, FaUsers, FaUserSlash, FaWallet } from 'react-icons/fa'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
import { UserProvider } from '@renderer/context/UserContext'
import { protect } from '@renderer/security/Security'

interface Menu {
  name: string
  path?: string
  icon: JSX.Element
  subMenus: { name: string; path: string; iconsubmenu?: JSX.Element }[]
}

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { user } = useContext(UserProvider)
  const paths = protect(user)
  const navigate = useNavigate()

  const menus: Menu[] = [
    {
      name: 'Dashboard',
      path: paths?.includes('/home') ? '/home' : '/home/denied',
      icon: <LuLayoutDashboard size={22} aria-hidden="true" />,
      subMenus: []
    },
    {
      name: 'Élèves',
      icon: <LuGraduationCap size={22} aria-hidden="true" />,
      subMenus: [
        {
          name: 'Infos des élèves',
          path: paths?.includes('/home/StudentsInfo') ? '/home/StudentsInfo' : '/home/denied',
          iconsubmenu: <HiOutlineInformationCircle size={22} aria-hidden="true" />
        },
        {
          name: 'Gestion des notes',
          path: paths?.includes('/home/notemanagements') ? '/home/notemanagements' : '/home/denied',
          iconsubmenu: <MdAssignment size={22} aria-hidden="true" />
        },
        {
          name: 'Frais de Scolarité',
          path: paths?.includes('/home/ecolagestudents') ? '/home/ecolagestudents' : '/home/denied',
          iconsubmenu: <BsCash size={22} aria-hidden="true" />
        },
        {
          name: 'Droit',
          path: paths?.includes('/home/StudentsDroit') ? '/home/StudentsDroit' : '/home/denied',
          iconsubmenu: <FaWallet size={22} aria-hidden="true" />
        },
        {
          name: 'Kermesse',
          path: paths?.includes('/home/StudentsKermess') ? '/home/StudentsKermess' : '/home/denied',
          iconsubmenu: <FaCoins size={22} aria-hidden="true" />
        },
        {
          name: 'Élèves inactifs',
          path: paths?.includes('/home/studentsInactif') ? '/home/studentsInactif' : '/home/denied',
          iconsubmenu: <FaUserSlash size={22} aria-hidden="true" />
        }
      ]
    },
    {
      name: 'Employés',
      icon: <MdWorkOutline size={22} aria-hidden="true" />,
      subMenus: [
        {
          name: "Information d'employés",
          path: paths?.includes('/home/EmployeInfo') ? '/home/EmployeInfo' : '/home/denied',
          iconsubmenu: <FaUsers size={22} aria-hidden="true" />
        },
        {
          name: "Suivi d'employés",
          path: paths?.includes('/home/Employersuivi') ? '/home/Employersuivi' : '/home/denied',
          iconsubmenu: <HiUserCircle size={22} aria-hidden="true" />
        }
      ]
    },
    {
      name: 'Historiques',
      path: paths?.includes('/home/Historique') ? '/home/Historique' : '/home/denied',
      icon: <FaHistory size={20} aria-hidden="true" />,
      subMenus: []
    }
  ]

  const dispatch = useDispatch()
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const activeName = useSelector((state: RootState) => state.activeLink.activeName)

  const [isLoading, setIsLoading] = useState(false)

  const logout = async () => {
    setIsLoading(true)
    try {
      await axiosRequest('GET', 'logout', null)
        .then(({ data }) => toast.success(data.message))
        .then(() => localStorage.removeItem('ACCESS_TOKEN'))
        .then(() => {
          dispatch(resetActiveName())
          navigate('/')
        })
        .catch((error) => console.error(error))
    } catch {
      toast.error('Le serveur ne répond pas')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMenuClick = (menuName: string) => {
    if (closeBar) return
    setActiveMenu((prev) => (prev === menuName ? null : menuName))
  }

  useEffect(() => {
    if (closeBar) setActiveMenu(null)
  }, [closeBar])

  return (
    <div className="relative">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen flex flex-col bg-[#6a2e3e] transition-all duration-[550ms] ease-in-out
          ${closeBar ? 'w-[5rem]' : 'w-[16rem]'}`}
        aria-label="Menu de navigation principal"
      >
        {/* Logo */}
        <div className="flex gap-3 items-center px-3 py-4 border-b border-white/10">
          <img
            className={`transition-all duration-300 ${closeBar ? 'w-10 h-10' : 'w-10 h-10'} object-contain flex-shrink-0`}
            src={logo}
            alt="Logo La Rosette"
          />
          {!closeBar && (
            <p className="font-semibold text-lg text-white tracking-wide whitespace-nowrap overflow-hidden transition-opacity duration-300">
              LA ROSETTE
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-1" role="menu">
            {menus.map((menu, index) => (
              <li key={index} className="relative" role="none">
                {menu.subMenus.length === 0 ? (
                  /* Lien direct */
                  <Link
                    to={menu.path || '#'}
                    role="menuitem"
                    aria-label={`Aller à ${menu.name}`}
                    onClick={() => dispatch(setActiveName(menu.name))}
                    className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl
                      ${activeName === menu.name ? s.active : s.inactive}
                      ${closeBar ? 'justify-center' : ''}`}
                  >
                    <span className="flex-shrink-0">{menu.icon}</span>
                    {!closeBar && (
                      <span className="text-sm font-medium transition-all duration-300 truncate">
                        {menu.name}
                      </span>
                    )}
                  </Link>
                ) : (
                  /* Bouton avec sous-menu */
                  <>
                    <button
                      type="button"
                      onClick={() => handleMenuClick(menu.name)}
                      aria-expanded={activeMenu === menu.name}
                      aria-controls={`submenu-${index}`}
                      aria-label={`${menu.name} — sous-menu ${activeMenu === menu.name ? 'ouvert' : 'fermé'}`}
                      className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium
                        ${s.normalBtn} ${closeBar ? 'justify-center' : ''}`}
                    >
                      <span className="flex-shrink-0">{menu.icon}</span>
                      {!closeBar && (
                        <>
                          <span className="flex-1 text-left truncate">{menu.name}</span>
                          <IoIosArrowForward
                            className={`flex-shrink-0 transition-transform duration-300
                              ${activeMenu === menu.name ? 'rotate-90' : ''}`}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    {/* Sous-menu étendu (sidebar ouverte) */}
                    {!closeBar && (
                      <div
                        id={`submenu-${index}`}
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: activeMenu === menu.name ? `${menu.subMenus.length * 3}rem` : '0'
                        }}
                      >
                        <ul className="py-1 pl-3 space-y-0.5" role="menu">
                          {menu.subMenus.map((subMenu, subIndex) => (
                            <li key={subIndex} role="none">
                              <NavLink
                                to={subMenu.path}
                                role="menuitem"
                                aria-label={`Aller à ${subMenu.name}`}
                                onClick={() => dispatch(setActiveName(subMenu.name))}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                                  ${activeName === subMenu.name ? s.submenuactive : s.submenuinactive}`}
                              >
                                {subMenu.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sous-menu tooltip (sidebar fermée) */}
                    {closeBar && (
                      <ul className={`${s.menukely2}`} role="menu" aria-label={`Sous-menu ${menu.name}`}>
                        {menu.subMenus.map((subMenu, subIndex) => (
                          <li key={subIndex} role="none">
                            <NavLink
                              to={subMenu.path}
                              role="menuitem"
                              aria-label={subMenu.name}
                              onClick={() => dispatch(setActiveName(subMenu.name))}
                              className={`flex items-center justify-center p-2 rounded-lg transition-all
                                ${activeName === subMenu.name ? s.submenuactive : s.submenuinactive}`}
                            >
                              {subMenu.iconsubmenu}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Pied de sidebar */}
        <div className="px-2 pb-4 space-y-1.5 border-t border-white/10 pt-3">
          <Link
            to={paths?.includes('/home/parametre') ? '/home/parametre' : '/home/denied'}
            onClick={() => dispatch(setActiveName('Paramètres'))}
            aria-label="Paramètres"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
              bg-white/10 text-white hover:bg-white/20 text-sm font-medium
              ${closeBar ? 'justify-center' : ''}`}
          >
            <MdSettings size={20} aria-hidden="true" />
            {!closeBar && <span>Paramètres</span>}
          </Link>

          <button
            onClick={logout}
            disabled={isLoading}
            aria-label="Se déconnecter"
            className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-all
              bg-white/10 text-white hover:bg-red-500/60 text-sm font-medium
              disabled:opacity-60 ${closeBar ? 'justify-center' : ''}`}
          >
            {isLoading ? (
              <ThreeDots visible height="18" width="40" color="white" radius="9" ariaLabel="Chargement déconnexion" />
            ) : (
              <>
                <FiLogOut size={18} aria-hidden="true" />
                {!closeBar && <span>Se déconnecter</span>}
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar

