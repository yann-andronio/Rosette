import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import { Users, UsersRound, DoorOpen } from 'lucide-react';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaMoneyBillWave,
  FaWallet,
  FaCoins,
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
import { axiosRequest } from '@renderer/config/helpers'
import { IconType } from 'react-icons'
import Operationretirermodal from '@renderer/components/modalsform/Operationretirermodal'
import Operationajoutmodal from '@renderer/components/modalsform/Operationajoutmodal'
import { RotatingLines, TailSpin } from 'react-loader-spinner'
import { ToastContainer } from 'react-toastify'

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
  const [ecolage, setEcolage] = useState<{ title: string; value: number; icon: IconType }>({
    title: '',
    value: 0,
    icon: FaMoneyBillWave
  })
  const [droit, setDroit] = useState<{ title: string; value: number; icon: IconType }>({
    title: '',
    value: 0,
    icon: FaWallet
  })
  const [kermesse, setKermesse] = useState<{ title: string; value: number; icon: IconType }>({
    title: '',
    value: 0,
    icon: FaCoins
  })
  const [ac, setAc] = useState<{ id: number; annee: string }[]>([])
  const [etudiant, setEtudiant] = useState<{ title: string; value: number; icon: IconType }>({
    title: '',
    value: 0,
    icon: FaUserGraduate
  })
  const [employe, setEmploye] = useState<{
    prof: { title: string; value: number; icon: IconType }
    all: { title: string; value: number; icon: IconType }
  }>({
    prof: { title: '', value: 0, icon: FaChalkboardTeacher },
    all: { title: '', value: 0, icon: FaUsers }
  })
  const [datapie, setDatapie] = useState(dataPie)
  const [databar, setDatabar] = useState<{
    revenus: number[]
    depenses: number[]
    status: number[]
  }>({
    revenus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    depenses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  })
  const [selectedYear, setSelectedYear] = useState<string>('last')

  const [debut, setDebut] = useState<string | null>(null)
  const [fin, setFin] = useState<string | null>(null)
  const [flux, setFlux] = useState<{ debit: number; credit: number }>({ debit: 0, credit: 0 })
  const [reload, setReload] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  const getFlux = async () => {
    try {
      await axiosRequest('GET', 'flux', null, 'token')
        .then(({ data }) => setFlux(data))
        .catch((err) => console.log(err?.response?.data?.error))
    } catch (error) {
      console.log('Le Serveur ne repond pas')
    }
  }

  const [isLoaderDataBar, setIsLoaderDataBar] = useState<boolean>(false)

  const getDatabar = async () => {
   setIsLoaderDataBar(true)
    try {
      await axiosRequest(
        'GET',
        `databar?year=${selectedYear}&start=${debut}&end=${fin}`,
        null,
        'token'
      )
        .then(({ data }) => setDatabar(data))
        .catch((error) => console.log(error))
        .then(() => setIsLoaderDataBar(false))
      .finally(()=>setIsLoaderDataBar(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }
  const getDatapie = async () => {
    try {
      await axiosRequest('GET', 'datapie', null, 'token')
        .then(({ data }) => setDatapie(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }
  const getEcolage = async () => {
    try {
      await axiosRequest('GET', 'ecolage-solde', null, 'token')
        .then(({ data }) => setEcolage(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getEmploye = async () => {
    try {
      await axiosRequest('GET', 'worker-count', null, 'token')
        .then(({ data }) => setEmploye(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getEtudiant = async () => {
    try {
      await axiosRequest('GET', 'etudiant-count', null, 'token')
        .then(({ data }) => setEtudiant(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getDroit = async () => {
    try {
      await axiosRequest('GET', 'droit-solde', null, 'token')
        .then(({ data }) => setDroit(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getKermesse = async () => {
    try {
      await axiosRequest('GET', 'kermesse-solde', null, 'token')
        .then(({ data }) => setKermesse(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const fetchDataJiaby = async () => {
    setIsLoading(true)
    try {
      await Promise.all([
        getEcolage(),
        getDroit(),
        getKermesse(),
        getEtudiant(),
        getEmploye(),
        getDatapie(),
        getFlux(),
        getAc(),
        getDatabar()
      ])
    } catch (error) {
      console.error('Erreur lors du chargement des data', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDataJiaby()
  }, [])

  useEffect(() => {
    getFlux()
    getEcolage()
    getDroit()
    getKermesse()

  }, [reload]);


  const [infra, setInfra] = useState([])



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
    try {
      await axiosRequest('GET', 'ac-list-no-month', null, 'token')
        .then(({ data }) => setAc(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const [reset, SetReset] = useState(false)

  useEffect(() => {
    getDatabar()



  }, [selectedYear, debut, fin, reload, reset])


  const getInfra = async () => {
    try{
      await axiosRequest('GET', 'infra', null, 'token')
        .then(({data}) => setInfra(data))
        .catch((error) => console.log(error))
    }catch (error){
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getInfra()
  }, []);
  const totalEleves = (salles) => {
    return salles.reduce((sum, salle) => sum + salle?.eleves?.length, 0)
  };

  const getStatusColor = (eleves, effectifMax) => {
    const ratio = eleves / effectifMax
    if (ratio >= 1) return 'text-red-600 bg-red-50'
    if (ratio >= 0.9) return 'text-orange-600 bg-orange-50'
    return 'text-green-600 bg-green-50'
  };


  const { modal, openModal, closModal } = useMultiModals()

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#E6E6FA]">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#895256"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p className="mt-4 text-xl font-semibold text-[#895256]">
            Chargement du tableau de bord...
          </p>
        </div>
      ) : (
        <div className="px-20 py-8">
          {/* Cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/*{dashboardCardsData.map((card, index) => (*/}
            {/*  <CardDashboard key={index} item={card} />*/}
            {/*))}*/}
            <CardDashboard key="etudiant" item={etudiant} />
            <CardDashboard key="professeur" item={employe.prof} />
            <CardDashboard key="employes" item={employe.all} />
            <CardDashboard key="ecolage" item={ecolage} />
            <CardDashboard key="droit" item={droit} />
            <CardDashboard key="kermesse" item={kermesse} />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            <div
              className="bg-white shadow-lg rounded-2xl p-6 lg:col-span-2 flex flex-col items-start relative"
              style={{ height: '450px' }}
            >
              {isLoaderDataBar && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80">
                  <RotatingLines
                    visible={true}
                    strokeColor="#7A3B3F"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              )}

              {/* Contenu du graphique */}
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
                    {ac.map((y, index) => (
                      <option key={index} value={y.id}>
                        {y.annee}
                      </option>
                    ))}
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

            <Calendarfilter setDebut={setDebut} setFin={setFin} SetReset={SetReset} reset={reset} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
            {/* Résumé benefice et perte en actuel  iniani iniany , magnano maj isan andro , ko tsisy perte de atao 0 */}
            <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#212529] mb-6">Résumé financier</h2>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between p-6 bg-green-50 rounded-2xl shadow-md">
                  <div>
                    <p className="text-lg text-gray-600">Débit</p>
                    <p className="text-3xl font-bold text-green-700 mt-1">+ {flux.debit} Ar</p>
                  </div>
                  <MdTrendingUp className="text-green-600 w-12 h-12" />
                </div>
                <div className="flex items-center justify-between p-6 bg-red-50 rounded-2xl shadow-md">
                  <div>
                    <p className="text-lg text-gray-600">Crédit</p>
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

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
          />
        </div>
      )}

      {modal.Operationretirermodal && (
        <Operationretirermodal
          reload={reload}
          setReload={setReload}
          closemodal={() => closModal('Operationretirermodal')}
        />
      )}
      {modal.Operationajoutmodal && (
        <Operationajoutmodal
          reload={reload}
          setReload={setReload}
          closemodal={() => closModal('Operationajoutmodal')}
        />
      )}

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Infrastructures de L'etablissement
          </h1>
          <p className="text-slate-600">
            Vue d'ensemble des salles de classe par niveau
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Classes</p>
                <p className="text-3xl font-bold text-slate-800">{infra?.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DoorOpen className="w-6 h-6 text-[#895256]" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Salles</p>
                <p className="text-3xl font-bold text-slate-800">
                  {infra?.reduce((sum, n) => sum + n.salles.length, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DoorOpen className="w-6 h-6 text-[#895256]" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Élèves</p>
                <p className="text-3xl font-bold text-slate-800">
                  {infra?.reduce((sum, n) => sum + totalEleves(n.salles), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#895256]" />
              </div>
            </div>
          </div>
        </div>


        <div className="space-y-6">
          {infra.map((niveau) => {
            return (
              <div
                key={niveau?.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >

                <div className="p-6 bg-indigo-50 border-b border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border-2 border-indigo-200">
                        <span className="text-2xl font-bold text-indigo-700">
                          {niveau?.nom_classe.slice(0, 4)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {niveau?.nom_classe}
                        </h2>
                        <p className="text-sm text-slate-600">
                          {niveau?.salles.length} salles • {totalEleves(niveau?.salles)} Etudiants
                        </p>
                      </div>
                    </div>
                    <span className="px-4 py-2 rounded-lg font-semibold bg-indigo-100 text-indigo-800">
                      {niveau?.salles?.length} salles
                    </span>
                  </div>
                </div>


                <div className="p-6">
                  <div className="space-y-3">
                    {niveau?.salles?.map((salle, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-indigo-200">
                              <DoorOpen className="w-6 h-6 text-[#895256]" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800 text-lg">
                                {salle.nom_salle}
                              </h3>
                              <p className="text-sm text-slate-500">
                                Salle de classe
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">

                            <div className="bg-white rounded-lg px-5 py-3 border-2 border-slate-200 shadow-sm">
                              <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-[#895256]" />
                                <div className="text-center">
                                  <p className="text-xs text-slate-500 font-medium mb-0.5">Etudiants</p>
                                  <p className={`text-2xl font-bold ${getStatusColor(3, salle.effectif)}`}>
                                    {salle?.eleves?.length}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Effectif max */}
                            <div className="bg-white rounded-lg px-5 py-3 border-2 border-slate-200 shadow-sm">
                              <div className="flex items-center gap-3">
                                <UsersRound className="w-6 h-6 text-[#895256]" />
                                <div className="text-center">
                                  <p className="text-xs text-slate-500 font-medium mb-0.5">Effectif Max</p>
                                  <p className="text-2xl font-bold text-slate-800">
                                    {salle.effectif}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
