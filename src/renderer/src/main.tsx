import './assets/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Store from './redux/Store'
import Login from './auth/login/Login'

import Home from './pages/home/Home'
import Studentsinfo from './pages/students/studentsinfo/Studentsinfo'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/Store'
// import Sidebar from './layout/sidebar/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import Notestudentsmanagement from './pages/students/notestudentsmanagements/Notestudentsmanagement'
import Parameters from './pages/parameters/Parameters'
import { UserContext } from '@renderer/context/UserContext'

import Studentsecolage from './pages/students/studentsecolage/Studentsecolage'
import Employerinfo from './pages/employer/Employerinfo'
import Employersuivi from './pages/employer/Employersuivi'
import Historique from './pages/historiques/Historique'
import { ToastContainer } from 'react-toastify'


const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      }
    ]
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: '/home/StudentsInfo',
        element: <Studentsinfo />
      },
      {
        path: '/home/notemanagements',
        element: <Notestudentsmanagement />
      },
      {
        path: '/home/ecolagestudents',
        element: <Studentsecolage />
      },
      {
        path: '/home/parametre',
        element: <Parameters />
      },
      {
        path: '/home/EmployeInfo',
        element: <Employerinfo />
      },
      {
        path: '/home/Employersuivi',
        element: <Employersuivi />
      },
      {
        path: '/home/Historique',
        element: <Historique />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={Store}>
      <UserContext>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={route} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
          />
        </PersistGate>
      </UserContext>
    </Provider>
  </React.StrictMode>
)
