import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaMoneyBillWave,
  FaWallet,
  FaCoins,
  FaIcons,
  FaPlus,
  FaMinus
} from 'react-icons/fa'
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)
import { Calendarfilter } from '@renderer/components/calendarfilter/Calendarfilter'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { CardDashboard } from '../../components/card/CardDashboard'
import Operationretirermodal from '@renderer/components/modalsform/Operationretirermodal'
import Operationajoutmodal from '@renderer/components/modalsform/Operationajoutmodal'

const dashboardCardsData = [
  { title: 'Étudiants', value: '1,240', icon: FaUserGraduate },
  { title: 'Enseignants', value: '85', icon: FaChalkboardTeacher },
  { title: 'Employés', value: '45', icon: FaUsers },
  { title: `Argent d'écolage`, value: '12,540', icon: FaMoneyBillWave },
  { title: 'Solde de droit', value: '12,540', icon: FaWallet },
  { title: 'Solde de kermess', value: '8,200', icon: FaCoins }
]

// ---- Mois jiaby ---- //
const FullMonth = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Déc'
]

// ---- Revenus sy  Dépenses data jusqu au mois de decembre ---- //
const revenus = [
  200000000, 250000000, 300000000, 280000000, 320000000, 350000000, 150000000, 180000000, 210000000,
  240000000, 300000000, 400000000
]

const depenses = [
  35000000, 38000000, 40000000, 37000000, 42000000, 45000000, 200000000, 190000000, 150000000,
  160000000, 180000000, 220000000
]
// ---- Bénéfices calculés ---- //
const benefices = revenus.map((rev, i) => rev - depenses[i])

// ---- Options graphique Bar ---- //
const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' as const } },
  scales: {
    x: { title: { display: true, text: 'Mois' } },
    y: {
      min: 0, // Valeur minimale
      max: 500000000, // Valeur maximale
      ticks: {
        stepSize: 50000000, // Intervalle entre chaque graduation
        callback: function (value) {
          return value + ' Ar'
        }
      },
      title: { display: true, text: 'Montant (Ar)' }
    }
  }
}

// ---- Données Pie (graph boribory) ---- //
const dataPie = {
  labels: ['Filles', 'Garçons', 'Enseignants', 'Employés'],
  datasets: [
    {
      label: 'Répartition',
      data: [650, 590, 85, 45],
      backgroundColor: ['#895256', '#9f7126', '#3b82f6', '#10b981'],
      borderColor: '#fff',
      borderWidth: 2
    }
  ]
}

// ---- Options graphique boribory ---- //
const optionsPie = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' as const } }
}

export default function Dashboard(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [range, setRange] = useState(3)

  const visibleLabels = FullMonth.slice(0, range)

  // decoupage des données selon le le range na filtre tsisy dikany
  const visibleRevenus = revenus.slice(0, range)
  const visibleDepenses = depenses.slice(0, range)
  const visibleBenefices = benefices.slice(0, range)

  // ----  données pour le graph bar ---- //
  const dataBar = {
    labels: visibleLabels,
    datasets: [
      {
        label: 'Revenus',
        data: visibleRevenus,
        backgroundColor: '#895256'
      },
      {
        label: 'Dépenses',
        data: visibleDepenses,
        backgroundColor: '#9f7126'
      },
      {
        label: 'Bénéfices / Pertes',
        data: visibleBenefices,
        backgroundColor: '#3b82f6'
      }
    ]
  }

  const { modal, openModal, closModal } = useMultiModals()

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      <div className="px-20 py-8">
        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {dashboardCardsData.map((card, index) => (
            <CardDashboard key={index} item={card} />
          ))}
          <div
            onClick={() => openModal('Operationajoutmodal')}
            className="bg-[#895256]  hover:shadow-2xl hover:scale-102 transition-all duration-300 flex-col rounded-2xl flex items-center justify-center cursor-pointer"
          >
            <div className="p-3 rounded-full bg-white text-[#895256] mb-3">
              <FaPlus size={22} />
            </div>

            <p className="text-lg text-white font-semibold text-center">Ajouter une Operation</p>
          </div>

          <div
            onClick={() => openModal('Operationretirermodal')}
            className="bg-[#895256]  hover:shadow-2xl hover:scale-102 transition-all duration-300 flex-col rounded-2xl flex items-center justify-center cursor-pointer"
          >
            <div className="p-3 rounded-full bg-white text-[#895256] mb-3">
              <FaMinus size={22} />
            </div>

            <p className="text-lg text-white font-semibold text-center">Retirer une Operation</p>
          </div>
        </div>

        {/* Graphique principal + calendrier */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="bg-white shadow-lg rounded-2xl p-6 lg:col-span-2 flex flex-col items-start"
            style={{ height: '450px' }}
          >
            <div className="flex justify-between items-center w-full mb-4">
              <h2 className="text-xl font-bold text-[#212529]">
                Évolution Revenus, Dépenses & Bénéfices
              </h2>
              <div className="flex space-x-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>

                <select
                  value={range}
                  onChange={(e) => setRange(parseInt(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value={3}>Trimestre (3 mois)</option>
                  <option value={6}>Semestre (6 mois)</option>
                  <option value={12}>Année complète (12 mois)</option>
                </select>
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-start">
              <Bar data={dataBar} options={optionsBar} />
            </div>
          </div>
          <Calendarfilter />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          {/* Résumé benefice et perte en actuel  iniani iniany , magnano maj isan andro , ko tsisy perte de atao 0 */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#212529] mb-6">Résumé financier</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between p-6 bg-green-50 rounded-2xl shadow-md">
                <div>
                  <p className="text-lg text-gray-600">Bénéfice</p>
                  <p className="text-3xl font-bold text-green-700 mt-1">+ 5,230 €</p>
                </div>
                <MdTrendingUp className="text-green-600 w-12 h-12" />
              </div>
              <div className="flex items-center justify-between p-6 bg-red-50 rounded-2xl shadow-md">
                <div>
                  <p className="text-lg text-gray-600">Pertes</p>
                  <p className="text-3xl font-bold text-red-700 mt-1">- 1,200 €</p>
                </div>
                <MdTrendingDown className="text-red-600 w-12 h-12" />
              </div>
            </div>
          </div>

          {/* Graphique Pie  (boribory)*/}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col lg:col-span-3">
            <h2 className="text-2xl font-bold text-[#212529] mb-4">Répartition des effectifs</h2>
            <div className="flex-1 w-full h-full">
              <Pie data={dataPie} options={optionsPie} />
            </div>
          </div>
        </div>
      </div>

      {modal.Operationretirermodal && (
        <Operationretirermodal closemodal={() => closModal('Operationretirermodal')} />
      )}
      {modal.Operationajoutmodal && (
        <Operationajoutmodal closemodal={() => closModal('Operationajoutmodal')} />
      )}
    </div>
  )
}
