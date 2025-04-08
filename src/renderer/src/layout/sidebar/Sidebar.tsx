import { setActiveName } from '@renderer/redux/slice/activeLinkSlice'
import { RootState } from '@renderer/redux/Store'
import { useState, useEffect } from 'react'
import { LuLayoutDashboard, LuGraduationCap } from 'react-icons/lu'
import { MdWorkOutline } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../images/logo/Logo4.png'
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi'
import { MdSettings } from 'react-icons/md'
import s from './sidebar.module.css'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { MdAssignment } from 'react-icons/md'
import { BiStats } from 'react-icons/bi'
import { RiScales3Line } from 'react-icons/ri'
import { BsCash } from 'react-icons/bs'
import { HiUserCircle } from 'react-icons/hi'

interface Menu {
  name: string
  path?: string
  icon: JSX.Element
  subMenus: { name: string; path: string; iconsubmenu?: JSX.Element }[]
}

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  

  const menus: Menu[] = [
    {
      name: 'Dashboard',
      path: '/home/Dashboard',
      icon: <LuLayoutDashboard size={25} />,
      subMenus: []
    },
    {
      name: 'Elèves',
      icon: <LuGraduationCap size={25} />,
      subMenus: [
        {
          name: 'Information des élèves',
          path: '/home/StudentsInfo',
          iconsubmenu: <HiOutlineInformationCircle size={25} />
        },
        {
          name: 'gestion des notes',
          path: '/home/gestionnotestudents',
          iconsubmenu: <MdAssignment size={25} />
        },
        { name: 'statuts', path: '/home/statutstudents', iconsubmenu: <BiStats size={25} /> },
        { name: 'droit', path: '/home/droiteleve', iconsubmenu: <RiScales3Line size={25} /> },
        { name: 'Ecolage', path: '/home/ecolagestudents', iconsubmenu: <BsCash size={25} /> }
      ]
    },
    {
      name: 'Employés',
      icon: <MdWorkOutline size={25} />,
      subMenus: [
        {
          name: `information d'employer`,
          path: '/sales/products',
          iconsubmenu: <HiUserCircle size={25} />
        }
      ]
    }
  ]
  const dispatch = useDispatch()
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const activeName = useSelector((state: RootState) => state.activeLink.activeName)

  const handleMenuClick = (menuName: string) => {
    if (closeBar) return

    setActiveMenu(activeMenu === menuName ? null : menuName)
  }
  useEffect(() => {
    if (closeBar) {
      setActiveMenu(null)
    }
  }, [closeBar])

  return (
    <div className="relative">
      <aside
        className={`fixed top-0 left-0  z-40 w-64 h-screen  ${closeBar ? 'w-[5rem]' : 'w-[16rem]'} sm:translate-x-0   duration-[550ms] ease-in-out`}
        aria-label="Sidenav"
      >
        <div className="w-full flex gap-2 items-center justify-center p-3  bg-[#895256]     ">
          <img className={`${closeBar ? 'w-[100%]' : 'w-[25%]'}`} src={logo} alt="Logo" />
          <p className={`${closeBar ? 'hidden' : ''} font-mono text-2xl font-normal text-white `}>
            LA ROSETTE
          </p>
        </div>
        <div className={`overflow-y-auto py-2 px-3 h-full bg-[#895256]`}>
          <ul className="space-y-2.5">
            {menus.map((menu, index) => (
              <li key={index} className="relative">
                {menu.subMenus.length === 0 ? (
                  <Link
                    onClick={() => dispatch(setActiveName(menu.name))}
                    to={menu.path || '#'}
                    className={`flex items-center  ${activeName === menu.name ? s.active : s.inactive} p-2 w-full ${closeBar ? 'w-[5rem] justify-center' : 'w-[16rem]'}`}
                  >
                    {menu.icon}
                    {/* mbola mila reglegna nle hidden eto */}
                    <span
                      className={`font-normal transition-all duration-500 absolute left-12 ${closeBar ? 'opacity-0 hidden' : 'flex-1 ml-3 text-left whitespace-nowrap'}`}
                    >
                      {menu.name}
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMenuClick(menu.name)}
                    className={`flex items-center justify-center p-2 w-full text-base font-normal ${s.normalBtn} ${closeBar ? 'w-[5rem]' : 'w-[16rem]'}`}
                    aria-controls={`dropdown-${menu.name.toLowerCase()}`}
                  >
                    {menu.icon}
                    <span
                      className={`font-normal transition-all duration-500 absolute left-12 ${closeBar ? 'opacity-0 hidden' : 'flex-1 ml-3 text-left whitespace-nowrap'}`}
                    >
                      {menu.name}
                    </span>
                    {menu.subMenus.length > 0 && (
                      <IoIosArrowForward
                        className={`${closeBar ? 'hidden ' : 'w-6 h-6 ml-auto'}`}
                      />
                    )}
                  </button>
                )}
                {menu.subMenus.length > 0 && (
                  <ul
                    id={`dropdown-${menu.name.toLowerCase()}`}
                    className={`${activeMenu === menu.name ? 'block' : 'hidden'} py-2 space-y-2 ${closeBar ? 'hidden' : ''}`}
                  >
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <li
                        key={subIndex}
                        className={`${activeName === subMenu.name ? s.submenuactive : s.submenuinactive}     `}
                      >
                        <NavLink
                          onClick={() => dispatch(setActiveName(subMenu.name))}
                          to={subMenu.path}
                          className={` flex items-center p-2 pl-11 w-full text-base font-normal `}
                        >
                          {subMenu.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}

                {menu.subMenus.length > 0 && (
                  <ul
                    id={`dropdown-${menu.name.toLowerCase()}`}
                    className={` py-2 space-y-2 ${closeBar ? s.menukely2 : 'hidden'}  `}
                  >
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <li
                        key={subIndex}
                        className={`   flex ${activeName === subMenu.name ? s.submenuactive : s.submenuinactive}     `}
                      >
                        <NavLink
                          onClick={() => dispatch(setActiveName(subMenu.name))}
                          to={subMenu.path}
                          className={` flex items-center p-2 pl-11 w-full text-base font-normal `}
                        >
                          {subMenu.iconsubmenu}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Paramètres sy  deconnexion */}
        <div className="absolute z-50 bottom-4 left-0 w-full px-4 flex flex-col space-y-3">
          <Link
            to="/settings"
            className={` ${closeBar ? 'justify-center' : ''} z-50 flex items-center p-2 bg-[#fffaf0] text-[#895256] hover:bg-[#6d3f42] hover:text-white rounded-lg transition-all duration-300 shadow-md`}
          >
            <MdSettings size={25} />
            {!closeBar && <span className="ml-3">Paramètres</span>}
          </Link>

          <button
            className={` ${closeBar ? 'justify-center' : ''} flex items-center p-2 bg-[#fffaf0] text-[#895256] hover:bg-[#6d3f42] hover:text-white rounded-lg transition-all duration-300 shadow-md`}
          >
            <FiLogOut size={22} />
            {!closeBar && <span className="ml-3">Se deconnecter</span>}
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
