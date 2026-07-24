import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'
import { Users, UsersRound, DoorOpen } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell, Label } from 'recharts';

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
import { Calendarfilter } from '@renderer/components/calendarfilter/Calendarfilter'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { CardDashboard } from '../../components/card/CardDashboard'
import { axiosRequest } from '@renderer/config/helpers'
import { IconType } from 'react-icons'
import Operationretirermodal from '@renderer/components/modalsform/Operationretirermodal'
import Operationajoutmodal from '@renderer/components/modalsform/Operationajoutmodal'
import { RotatingLines, TailSpin } from 'react-loader-spinner'

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
  labels: ['none', 'none', 'none', 'none'],
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
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#212529',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || ''
          const value = context.raw || 0
          return `${label} : ${value} élèves`
        }
      }
    }
  }
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
      await axiosRequest('GET', 'flux', null)
        .then(({ data }) => setFlux(data))
        .catch((err) => console.log(err?.response?.data?.error))
    } catch {
      console.log('Le Serveur ne repond pas')
    }
  }
  const [dataDebitCreditRechart, setDataDebitCreditRechart] = useState<{ month: string; debit: number; credit: number }[]>([])

  const getTradingChart = async () => {
    try {
      await axiosRequest('GET', 'tradingchart', null)
        .then(({ data }) => setDataDebitCreditRechart(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTradingChart()
  }, [])

  const [isLoaderDataBar, setIsLoaderDataBar] = useState<boolean>(false)

  const getDatabar = async () => {
    setIsLoaderDataBar(true)
    try {
      await axiosRequest('GET', `databar?year=${selectedYear}&start=${debut}&end=${fin}`, null)
        .then(({ data }) => setDatabar(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoaderDataBar(false))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  const getDatapie = async () => {
    try {
      await axiosRequest('GET', 'datapie', null)
        .then(({ data }) => setDatapie(data))
        .catch((error) => console.log(error))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  const getEcolage = async () => {
    try {
      await axiosRequest('GET', 'ecolage-solde', null)
        .then(({ data }) => setEcolage(data))
        .catch((error) => console.log(error))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  const getEmploye = async () => {
    try {
      await axiosRequest('GET', 'worker-count', null)
        .then(({ data }) => setEmploye(data))
        .catch((error) => console.log(error))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  const getEtudiant = async () => {
    try {
      await axiosRequest('GET', 'etudiant-count', null)
        .then(({ data }) => setEtudiant(data))
        .catch((error) => console.log(error))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  const getDroit = async () => {
    try {
      await axiosRequest('GET', 'droit-solde', null)
        .then(({ data }) => setDroit(data))
        .catch((error) => console.log(error))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  const getKermesse = async () => {
    try {
      await axiosRequest('GET', 'kermesse-solde', null)
        .then(({ data }) => setKermesse(data))
        .catch((error) => console.log(error))
    } catch {
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
  }, [reload])

  const [infra, setInfra] = useState<any[]>([])

  const visibleLabels = FullMonth.slice(0, range)

  // decoupage des données selon le le range na filtre tsisy dikany
  const visibleRevenus = databar?.revenus.slice(0, range)
  const visibleDepenses = databar?.depenses.slice(0, range)
  const visibleBenefices = databar?.status.slice(0, range)

  // ----  données pour le graph bar ---- //
  const rechartsBarData = visibleLabels.map((label, index) => ({
    name: label,
    Revenus: visibleRevenus[index] || 0,
    Dépenses: visibleDepenses[index] || 0,
    Bénéfices: visibleBenefices[index] || 0
  }));

  const getAc = async () => {
    try {
      await axiosRequest('GET', 'ac-list-no-month', null)
        .then(({ data }) => setAc(data))
        .catch((error) => console.log(error))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  const [reset, SetReset] = useState(false)

  useEffect(() => {
    getDatabar()
  }, [selectedYear, debut, fin, reload, reset])

  const getInfra = async () => {
    try {
      await axiosRequest('GET', 'infra', null)
        .then(({ data }) => setInfra(data))
        .catch((error) => console.log(error))
    } catch {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getInfra()
  }, [])
  const totalEleves = (salles) => {
    return salles.reduce((sum, salle) => sum + salle?.eleves?.length, 0)
  }

  const getStatusColor = (eleves, effectifMax) => {
    const ratio = eleves / effectifMax
    if (ratio >= 1) return 'text-red-600 bg-red-50'
    if (ratio >= 0.9) return 'text-orange-600 bg-orange-50'
    return 'text-green-600 bg-green-50'
  }

  const { modal, openModal, closModal } = useMultiModals()

  const [selectedMajorExam, setSelectedMajorExam] = useState<'1' | '2' | '3' | 'last'| '4'>('last')

// ---- Graphique Performance Moyenne par Classe (FAKE DATA) ---- //
const [dataPerformance, setDataPerformance] = useState<{labels:string[], datasets:{label:string, data:number[], backgroundColor:string}[]}>({
  labels: ['label1, label2'],
  datasets: [
    {
      label: 'Moyenne Générale (%)',
      data: [1,2],
      backgroundColor: '#7c3aed'
    }
  ]
})

const getDataPerfomance = async () => {
  await axiosRequest('GET', 'performance', null, 'token')
  .then(({data}) => setDataPerformance(data))
}

useEffect(() => {
  getDataPerfomance()
}, [])




const optionsPerformance = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const},
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      title: { display: true, text: 'Pourcentage (%)' }
    }
  }
}

const [majors, setMajors] = useState<{classe:string, nom;string, moyenne:number}[]>([])


const getMajors = async () => {

  await axiosRequest('GET', `major?nbr=${selectedMajorExam}`, null, 'token')
  .then(({data}) => setMajors(data))
}



useEffect(() => {
  getMajors()
}, [selectedMajorExam])

majors.sort((a,b) => b.moyenne-a.moyenne)
  return (
    <div
      className={`Rigth bg-[#F0EFF8] w-full ${closeBar ? '"ml-16"' : ''} transition-all duration-[600ms] ease-in-out ${Object.values(modal).some((isOpen) => isOpen) ? 'overflow-hidden' : ''}`}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#F0EFF8]">
          <TailSpin visible height="60" width="60" color="#7A3B3F" ariaLabel="tail-spin-loading" radius="1" />
          <p className="mt-4 text-base font-semibold text-[#7A3B3F]">Chargement du tableau de bord...</p>
        </div>
      ) : (
        <div className="page-content">
          {/* Cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/*{dashboardCardsData.map((card, index) => (*/}
            {/*  <CardDashboard key={index} item={card} />*/}
            {/*))}*/}
            <CardDashboard key="etudiant" item={etudiant} />
            <CardDashboard key="professeur" item={employe.prof} />
            <CardDashboard key="employes" item={employe.all} />
            <CardDashboard key="ecolage" item={ecolage} />
            <CardDashboard key="droit" item={droit} />
            <CardDashboard key="kermesse" item={kermesse} />
            <button
              type="button"
              onClick={() => openModal('Operationajoutmodal')}
              className="card p-5 flex flex-col items-center justify-center gap-3 cursor-pointer border-2 border-dashed border-green-200 hover:border-green-400 hover:bg-green-50/50 transition-all min-h-[100px]"
            >
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <FaPlus size={18} />
              </div>
              <p className="text-sm font-semibold text-green-700">Dépôt d'argent</p>
            </button>

            <button
              type="button"
              onClick={() => openModal('Operationretirermodal')}
              className="card p-5 flex flex-col items-center justify-center gap-3 cursor-pointer border-2 border-dashed border-red-200 hover:border-red-400 hover:bg-red-50/50 transition-all min-h-[100px]"
            >
              <div className="p-3 rounded-xl bg-red-100 text-red-600">
                <FaMinus size={18} />
              </div>
              <p className="text-sm font-semibold text-red-700">Retrait d'argent</p>
            </button>
          </div>

          {/* Graphique principal + calendrier */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            <div className="card p-6 lg:col-span-2 flex flex-col items-start relative" style={{ height: '420px' }}>
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
              <div className="flex flex-wrap gap-3 justify-between items-center w-full mb-4">
                <h2 className="text-base font-bold text-gray-900">Revenus · Dépenses · Bénéfices</h2>
                <div className="flex gap-2 flex-wrap">
                  <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="select-field text-sm">
                    {ac.map((y, index) => <option key={index} value={y.id}>{y.annee}</option>)}
                  </select>
                  <select value={range} onChange={(e) => setRange(parseInt(e.target.value))} className="select-field text-sm">
                    <option value={3}>3 mois</option>
                    <option value={6}>6 mois</option>
                    <option value={12}>12 mois</option>
                  </select>
                </div>
              </div>
              <div className="w-full h-full pb-10 flex items-center justify-start">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rechartsBarData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0eef8" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9593b4', fontSize: 12 }} />
                    <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{ fill: '#9593b4', fontSize: 11 }} width={45} />
                    <Tooltip
                      formatter={(value: number) => [`${value.toLocaleString('fr-FR')} Ar`]}
                      contentStyle={{ borderRadius: '10px', border: '1px solid #ede9f6', boxShadow: '0 8px 24px rgba(0,0,0,.08)', fontSize: 13 }}
                      cursor={{ fill: 'rgba(122,59,63,.04)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    <Bar dataKey="Revenus" fill="#7A3B3F" radius={[6, 6, 0, 0]} barSize={14} />
                    <Bar dataKey="Dépenses" fill="#9f7126" radius={[6, 6, 0, 0]} barSize={14} />
                    <Bar dataKey="Bénéfices" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Calendarfilter setDebut={setDebut} setFin={setFin} SetReset={SetReset} reset={reset} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
            {/* Résumé benefice et perte en actuel  iniani iniany , magnano maj isan andro , ko tsisy perte de atao 0 */}
            <div className="card p-6 flex flex-col justify-between lg:col-span-2">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Résumé financier</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Crédit total</p>
                    <p className="text-2xl font-extrabold text-green-700 mt-0.5">{Number(flux.debit).toLocaleString('fr-FR')} Ar</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-100"><MdTrendingUp className="text-green-600 w-7 h-7" /></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Débit total</p>
                    <p className="text-2xl font-extrabold text-red-700 mt-0.5">{Number(flux.credit).toLocaleString('fr-FR')} Ar</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-100"><MdTrendingDown className="text-red-600 w-7 h-7" /></div>
                </div>
              </div>
            </div>

            {/* Graphique Pie  (boribory)*/}
            <div className="card p-6 flex flex-col lg:col-span-3" style={{ minHeight: '360px' }}>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Répartition des effectifs</h2>
              <div className="flex-1 w-full h-full pb-6 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip 
                      formatter={(value: number) => [`${value} élèves`]} 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', fontWeight: 500 }}
                    />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                    <Pie
                      data={datapie.labels.map((label, index) => ({ name: label, value: datapie.datasets[0]?.data[index] || 0 }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={85}
                      outerRadius={120}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={8}
                    >
                      {datapie.labels.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={(datapie.datasets[0]?.backgroundColor as string[])?.[index % ((datapie.datasets[0]?.backgroundColor as string[])?.length || 1)] || '#895256'} />
                      ))}
                      <Label 
                        value={(datapie.datasets[0]?.data || []).reduce((a, b) => a + b, 0)} 
                        position="center" 
                        fill="#212529"
                        style={{ fontSize: '32px', fontWeight: 'bold' }}
                        dy={-10}
                      />
                      <Label 
                        value="Total Élèves" 
                        position="center" 
                        fill="#6b7280"
                        style={{ fontSize: '14px', fontWeight: '500' }}
                        dy={16}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
              <div className="card p-6 mt-6" style={{ height: '380px' }}>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Évolution Débit &amp; Crédit</h2>

  <div className="w-full h-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={dataDebitCreditRechart}
        // margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `${value.toLocaleString()} Ar`} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
        <Tooltip 
          formatter={(value:number) =>  `${value.toLocaleString()} Ar`}
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
        <Line type="monotone" dataKey="debit" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3, fill: '#dc2626' }} activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="credit" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3, fill: '#16a34a' }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
          </div>
        </div>
          {/* ===== Performance & Majors ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            {/* Graphique Performance */}
            <div className="card p-6" style={{ height: '380px' }}>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Performance par Classe</h2>
    <div className="w-full h-full pb-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={dataPerformance.labels.map((label, index) => ({
            name: label,
            "Moyenne": dataPerformance.datasets[0]?.data[index] || 0
          }))} 
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
          <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
          <Tooltip 
            formatter={(value: number) => `${value}%`} 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            cursor={{fill: 'transparent'}}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          <Bar dataKey="Moyenne" fill="#7c3aed" radius={[4, 4, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
            </div>

            {/* Tableau Majors */}
            <div className="card p-6 relative">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Élèves Majors par Classe</h2>

              <select
                value={selectedMajorExam}
                onChange={(e) => setSelectedMajorExam(e.target.value as '1' | '2' | '3' | 'last' | '4')}
                className="select-field text-sm absolute right-4 top-4"
              >
                <option value="last">Dernier Examen</option>
                <option value="1">1er Examen</option>
                <option value="2">2ème Examen</option>
                <option value="3">3ème Examen</option>
                <option value="4">Moyenne générale</option>
              </select>
              <div className="overflow-x-auto mt-10">
                <table className="min-w-full rounded-xl overflow-hidden">
                  <thead className="table-header">
                    <tr>
                      <th className="py-3 px-4 text-left">Classe</th>
                      <th className="py-3 px-4 text-left">Nom</th>
                      <th className="py-3 px-4 text-left">Moy.</th>
                    </tr>
        </thead>
        <tbody>
                    {majors.map((eleve, index) => (
                      <tr key={index} className="table-row">
                        <td className="py-2.5 px-4 text-xs font-semibold text-gray-500 uppercase">{eleve.classe}</td>
                        <td className="py-2.5 px-4 text-sm font-medium text-gray-800">{eleve.nom}</td>
                        <td className="py-2.5 px-4">
                          <span className="badge badge-brand">{eleve.moyenne}/20</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
 
          <div className="mt-8 mb-5">
            <div className="page-header">
              <div>
                <h2 className="page-title">Infrastructures</h2>
                <p className="text-sm text-gray-500 mt-1 ml-4">Vue d'ensemble des salles de classe par niveau</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="card p-5">
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
              <div className="card p-5">
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
              <div className="card p-5">
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
                          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border-2 border-[#895256]">
                            <span className="text-2xl font-bold text-[#895256]">
                              {niveau?.nom_classe.slice(0, 4)}
                            </span>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                              {niveau?.nom_classe}
                            </h2>
                            <p className="text-sm text-slate-600">
                              {niveau?.salles.length} salles • {totalEleves(niveau?.salles)}{' '}
                              Etudiants
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
                                  <p className="text-sm text-slate-500">Salle de classe</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="bg-white rounded-lg px-5 py-3 border-2 border-slate-200 shadow-sm">
                                  <div className="flex items-center gap-3">
                                    <Users className="w-6 h-6 text-[#895256]" />
                                    <div className="text-center">
                                      <p className="text-xs text-slate-500 font-medium mb-0.5">
                                        Etudiants
                                      </p>
                                      <p
                                        className={`text-2xl font-bold ${getStatusColor(3, salle.effectif)}`}
                                      >
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
                                      <p className="text-xs text-slate-500 font-medium mb-0.5">
                                        Effectif Max
                                      </p>
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
                )
              })}
            </div>
          </div>
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
    </div>
  )
}
