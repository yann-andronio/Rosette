import  { useEffect, useId, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaMoneyBillWave, FaWallet, FaCoins, FaPlus } from 'react-icons/fa'
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)
import { Calendarfilter } from '@renderer/components/calendarfilter/Calendarfilter'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { CardDashboard } from '../../components/card/CardDashboard'
import Operationmodal from '@renderer/components/modalsform/Operationmodal'
import { axiosRequest } from '@renderer/config/helpers'

import { IconType } from 'react-icons'
// ---- Mois jiaby ---- //
const FullMonth = [ 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']

// ---- Options graphique Bar ---- //
const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' as const } },
  scales: {
    x: { title: { display: true, text: 'Mois' } },
    y: {
      min: 0, // Valeur minimale
      max: 200000000, // Valeur maximale
      ticks: {
        stepSize: 2000000, // Intervalle entre chaque graduation
        callback: function (value) {
          return value + ' Ar'
        }
      },
      title: { display: true, text: 'Montant (Ar)' }
    }
  }
}

// // ---- Données Pie (graph boribory) ---- //
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

  const [range, setRange] = useState(3)
  const [ecolage, setEcolage] = useState<{ title: string, value: number, icon: IconType }>({ title: '', value: 0, icon: FaMoneyBillWave })
  const [droit, setDroit] = useState<{ title: string, value: number, icon: IconType }>({ title: '', value: 0, icon: FaWallet })
  const [kermesse, setKermesse] = useState<{ title: string, value: number, icon: IconType }>({ title: '', value: 0, icon: FaCoins })
  const [ac, setAc] =useState<{id:number, annee:string}[]>([])
  const [etudiant, setEtudiant] = useState<{ title: string, value: number, icon: IconType }>({ title: '', value: 0, icon: FaUserGraduate })
  const [employe, setEmploye] = useState<{prof:{ title: string, value: number, icon: IconType }, all:{ title: string, value: number, icon: IconType }}>({prof:{ title: '', value: 0, icon: FaChalkboardTeacher }, all:{ title: '', value: 0, icon: FaUsers }})
  const [datapie, setDatapie] = useState(dataPie)
  const[databar, setDatabar] = useState<{revenus:number[], depenses:number[], status:number[]}>({revenus:[0,0,0,0,0,0,0,0,0,0,0,0], depenses:[0,0,0,0,0,0,0,0,0,0,0,0], status:[0,0,0,0,0,0,0,0,0,0,0,0]})
  const [selectedYear, setSelectedYear] = useState<string>('last')
  const [debut, setDebut] = useState<string|null>(null)
  const [fin, setFin] = useState<string|null>(null)
  const [flux, setFlux] = useState<{debit:number, credit:number}>({debit:0, credit:0})

  const getFlux= async () => {
    try{
      await  axiosRequest('GET', 'flux', null , 'token')
        .then(({data}) => setFlux(data))
        .catch(err => console.log(err?.response?.data?.error))
    }catch(error){
      console.log('Le Serveur ne repond pas')
    }

  }
  const getDatabar = async () => {
  try{
    await axiosRequest('GET', `databar?year=${selectedYear}&start=${debut}&end=${fin}`, null, 'token')
      .then(({data}) => setDatabar(data))
      .catch(error => console.log(error))
  }catch(error){
    console.log('Le serveur ne repond pas')
  }
 }
  const getDatapie = async () => {
    try{
      await axiosRequest('GET', 'datapie', null, 'token')
        .then(({data}) => setDatapie(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }
  const getEcolage = async () => {
    try{
      await axiosRequest('GET', 'ecolage-solde', null, 'token')
        .then(({data}) => setEcolage(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getEmploye = async () => {
    try{
      await axiosRequest('GET', 'worker-count', null, 'token')
        .then(({data}) => setEmploye(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getEtudiant = async () => {
    try{
      await axiosRequest('GET', 'etudiant-count', null, 'token')
        .then(({data}) => setEtudiant(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }


  const getDroit = async () => {
    try{
      await axiosRequest('GET', 'droit-solde', null, 'token')
        .then(({data}) => setDroit(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getKermesse = async () => {
    try{
      await axiosRequest('GET', 'kermesse-solde', null, 'token')
        .then(({data}) => setKermesse(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }


  useEffect(() => {
    getEcolage()
    getDroit()
    getKermesse()
    getEtudiant()
    getEmploye()
    getDatapie()
  getFlux()
    getAc()
  }, [])


  const visibleLabels = FullMonth.slice(0, range)

  // decoupage des données selon le le range na filtre tsisy dikany
  const visibleRevenus = databar?.revenus.slice(0, range)
  const visibleDepenses = databar?.depenses.slice(0, range)
  const visibleBenefices = databar?.status.slice(0, range)

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

  const getAc = async () => {
    try{
      await axiosRequest('GET', 'ac-list-no-month', null, 'token')
        .then(({data}) => setAc(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log('Le serveur ne repond pas')
    }
  }
   const { modal, openModal, closModal } = useMultiModals()
  useEffect(() => {
    getDatabar()
  }, [selectedYear,debut, fin])


  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      <div className="px-20 py-8">
        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/*{dashboardCardsData.map((card, index) => (*/}
          {/*  <CardDashboard key={index} item={card} />*/}
          {/*))}*/}
          <CardDashboard key={useId()} item={etudiant} />
          <CardDashboard key={useId()} item={employe.prof} />
          <CardDashboard key={useId()} item={employe.all} />
          <CardDashboard key={useId()} item={ecolage} />
          <CardDashboard key={useId()} item={droit} />
          <CardDashboard key={useId()} item={kermesse} />
          <div
            onClick={() => openModal('OperationModal')}
            className="bg-[#895256]  hover:shadow-2xl hover:scale-102 transition-all duration-300 flex-col rounded-2xl flex items-center justify-center cursor-pointer"
          >
            <div className="p-3 rounded-full bg-white text-[#895256] mb-3">
              <FaPlus size={22} />
            </div>

            <p className="text-lg text-white font-semibold text-center">Ajouter une Operation</p>
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
                  {
                    ac.map((y, index) => (
                      <option  key={index} value={y.id}>{y.annee}</option>
                    ))
                  }

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
          <Calendarfilter setDebut={setDebut} setFin={setFin} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          {/* Résumé benefice et perte en actuel  iniani iniany , magnano maj isan andro , ko tsisy perte de atao 0 */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#212529] mb-6">Résumé financier</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between p-6 bg-green-50 rounded-2xl shadow-md">
                <div>
                  <p className="text-lg text-gray-600">Bénéfice</p>
                  <p className="text-3xl font-bold text-green-700 mt-1">+ {flux.debit} Ar</p>
                </div>
                <MdTrendingUp className="text-green-600 w-12 h-12" />
              </div>
              <div className="flex items-center justify-between p-6 bg-red-50 rounded-2xl shadow-md">
                <div>
                  <p className="text-lg text-gray-600">Pertes</p>
                  <p className="text-3xl font-bold text-red-700 mt-1">- {flux.credit} Ar</p>
                </div>
                <MdTrendingDown className="text-red-600 w-12 h-12" />
              </div>
            </div>
          </div>

          {/* Graphique Pie  (boribory)*/}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col lg:col-span-3">
            <h2 className="text-2xl font-bold text-[#212529] mb-4">Répartition des effectifs</h2>
            <div className="flex-1 w-full h-full">
              <Pie data={datapie} options={optionsPie} />
            </div>
          </div>
        </div>
      </div>

      {modal.OperationModal && <Operationmodal closemodal={() => closModal('OperationModal')} />}
    </div>
  )
}
