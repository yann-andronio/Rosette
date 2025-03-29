import { setActiveName } from '@renderer/redux/slice/activeLinkSlice'
import { RootState } from '@renderer/redux/Store'
import React, { useState } from 'react'
import { FaHome, FaFileAlt, FaUsers, FaUsersCog } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

interface Menu {
  name: string
  path?: string
  icon: JSX.Element
  subMenus: { name: string; path: string }[] // Chaque sous-menu a un nom et un chemin
}

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null) // Gérer l'état des sous-menus

  const menus: Menu[] = [
    {
      name: 'Dashboard',
      path: '/Dashboarddd',
      icon: <FaHome />,
      subMenus: [] // Pas de sous-menus
    },
    {
      name: 'Elèves',
      icon: <FaUsers />, // Icône pour "Elèves"
      subMenus: [
        { name: 'information', path: '/informationsstudents' },
        { name: 'gestion des notes', path: '/gestionnotestudents' },
        { name: 'Ecolage', path: '/ecolagestudents' }
      ]
    },
    {
      name: 'Employés',
      icon: <FaUsersCog />, // Icône pour "Employés"
      subMenus: [{ name: `information d'employer`, path: '/sales/products' }]
    }
  ]

  const handleMenuClick = (menuName: string) => {
    // Si le menu est déjà ouvert, on le ferme, sinon on l'ouvre
    setActiveMenu(activeMenu === menuName ? null : menuName)
  }

  const dispatch = useDispatch()
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)

  return (
    <div className="relative">
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${closeBar ? 'w-[5rem]' : 'w-[16rem]'} sm:translate-x-0`}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            {menus.map((menu, index) => (
              <li key={index}>

                {menu.subMenus.length === 0 ? (
                  <Link
                    onClick={() => dispatch(setActiveName(menu.name))}
                    to={menu.path || '#'}
                    className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${closeBar ? 'w-[5rem]' : 'w-[16rem]'}`}
                  >
                    {menu.icon}
                    <span
                      className={`font-normal transition-all duration-500 absolute left-12 ${closeBar ? 'opacity-0 translate-x-40' : 'flex-1 ml-3 text-left whitespace-nowrap'}`}
                    >
                      {menu.name}
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMenuClick(menu.name)}
                    className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${closeBar ? 'w-[5rem]' : 'w-[16rem]'}`}
                    aria-controls={`dropdown-${menu.name.toLowerCase()}`}
                  >
                    {menu.icon}
                    <span
                      className={`font-normal transition-all duration-500 absolute left-12 ${closeBar ? 'opacity-0 translate-x-40' : 'flex-1 ml-3 text-left whitespace-nowrap'}`}
                    >
                      {menu.name}
                    </span>
                    {menu.subMenus.length > 0 && <IoIosArrowForward className="w-6 h-6 ml-auto" />}
                  </button>
                )}
                {menu.subMenus.length > 0 && (
                  <ul
                    id={`dropdown-${menu.name.toLowerCase()}`}
                    className={`${activeMenu === menu.name ? 'block' : 'hidden'} py-2 space-y-2`}
                  >
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subMenu.path}
                          className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${closeBar ? 'hidden' : ''}`}
                        >
                          {subMenu.name}
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
