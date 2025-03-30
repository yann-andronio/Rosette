import { setActiveName } from '@renderer/redux/slice/activeLinkSlice'
import { RootState } from '@renderer/redux/Store'
import { useState, useEffect } from 'react'
import { LuLayoutDashboard, LuGraduationCap } from 'react-icons/lu'
import { MdWorkOutline } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import s from './sidebar.module.css'

interface Menu {
  name: string
  path?: string
  icon: JSX.Element
  subMenus: { name: string; path: string; iconsubmenu?:JSX.Element }[]
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
        { name: 'information', path: '/home/StudentsInfo', iconsubmenu:<LuGraduationCap size={25} /> },
        { name: 'gestion des notes', path: '/gestionnotestudents' , iconsubmenu:<LuGraduationCap size={25} /> },
        { name: 'Ecolage', path: '/ecolagestudents' , iconsubmenu:<LuGraduationCap size={25} />}
      ]
    },
    {
      name: 'Employés',
      icon: <MdWorkOutline size={25} />,
      subMenus: [
        { name: `information d'employer`, path: '/sales/products' , iconsubmenu:<LuGraduationCap size={25} />  },
        { name: `information d'employer`, path: '/sales/products' , iconsubmenu:<LuGraduationCap size={25} /> },
        { name: `information d'employer`, path: '/sales/products', iconsubmenu:<LuGraduationCap size={25} />  },
        { name: `information d'employer`, path: '/sales/products' , iconsubmenu:<LuGraduationCap size={25} /> },
        { name: `information d'employer`, path: '/sales/products', iconsubmenu:<LuGraduationCap size={25} />  }
      ]
    },
    {
      name: 'Employés',
      icon: <MdWorkOutline size={25} />,
      subMenus: [
        { name: `information d'employer`, path: '/sales/products', iconsubmenu:<LuGraduationCap size={25} />  },
        { name: `information d'employer`, path: '/sales/products' , iconsubmenu:<LuGraduationCap size={25} /> },
        { name: `information d'employer`, path: '/sales/products', iconsubmenu:<LuGraduationCap size={25} />  },
        { name: `information d'employer`, path: '/sales/products', iconsubmenu:<LuGraduationCap size={25} />  },
        { name: `information d'employer`, path: '/sales/products', iconsubmenu:<LuGraduationCap size={25} />  }
      ]
    }
  ]
  const dispatch = useDispatch()
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const activeName = useSelector((state: RootState) => state.activeLink.activeName)

  const handleMenuClick = (menuName: string) => {
    if (closeBar) return // Désactive le clic si closeBar est true

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
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${closeBar ? 'w-[5rem]' : 'w-[16rem]'} sm:translate-x-0`}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-[#895256]">
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

                {/* test1 */}
                {/* {menu.subMenus.length > 0 && (
                  <ul
                    id={`dropdown-${menu.name.toLowerCase()}`}
                    className={` py-2 space-y-2 ${closeBar ? s.menukely : 'hidden'}`}
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
                )} */}

                {/* test2 */}

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
      </aside>
    </div>
  )
}

export default Sidebar
