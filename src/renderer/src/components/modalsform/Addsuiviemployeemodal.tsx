import { useState, useEffect, useRef } from 'react'
import { FiX, FiEdit2, FiTrash2, FiSave } from 'react-icons/fi'
import { FaMoneyBillWave, FaCalendarAlt, FaUserCheck, FaCheck, FaTimes, FaPrint } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { EmployerType } from '@renderer/types/Alltypes'
import { Monthlistedata } from '@renderer/data/Monthlistedata'
import Recuepayementemploye from '../recue/Recuepayementemploye'


 export type SalaireEmploye = {
   montant: number
   typePaiement: string
   motif?: string
   mois: number[]
 }

 export type CongeType = {
  dateDebut: Date
  dateFin: Date
  motif: string
}

 export type StatusFormInputs = {
  nouveauStatut: string
}


const salarySchema = yup.object().shape({
  montant: yup
    .number()
    .typeError('Le montant doit être un nombre.')
    .required('Le montant est requis.')
    .positive('Le montant doit être positif.'),
  typePaiement: yup.string().required('Le type de paiement est requis.'),
  motif: yup.string().optional(),
  mois: yup
    .array()
    .of(yup.number())
    .min(1, 'Sélectionnez au moins un mois')
    .required('Sélectionnez au moins un mois')
})

const congeSchema = yup.object().shape({
  dateDebut: yup
    .date()
    .typeError('Date de début invalide.')
    .required('La date de début est requise.')
    .max(yup.ref('dateFin'), 'La date de début doit être avant la date de fin.'),
  dateFin: yup
    .date()
    .typeError('Date de fin invalide.')
    .required('La date de fin est requise.')
    .min(yup.ref('dateDebut'), 'La date de fin doit être après la date de début.'),
  motif: yup.string().required('Le motif est requis.')
})

const statusSchema = yup.object().shape({
  nouveauStatut: yup.string().required('Le statut est requis.')
})

type SuiviEmployerModalProps = {
  employer: EmployerType
  closemodal: () => void
}

export default function SuiviEmployerModal({ closemodal, employer }: SuiviEmployerModalProps) {
  const [activeTab, setActiveTab] = useState<'salaire' | 'conge' | 'statut'>('salaire')
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])


  const {
    register: registerSalary,
    handleSubmit: handleSubmitSalary,
    formState: { errors: errorsSalary },
    reset: resetSalary,
    setValue: setValueSalary
  } = useForm<SalaireEmploye>({ resolver: yupResolver(salarySchema as any) })

  const {
    register: registerConge,
    handleSubmit: handleSubmitConge,
    formState: { errors: errorsConge },
    reset: resetConge
  } = useForm<CongeType>({ resolver: yupResolver(congeSchema) })

  const {
    register: registerStatus,
    handleSubmit: handleSubmitStatus,
    formState: { errors: errorsStatus },
    reset: resetStatus
  } = useForm<StatusFormInputs>({ resolver: yupResolver(statusSchema) })

  const tabs = [
    { id: 'salaire', label: 'Paiement', icon: <FaMoneyBillWave className="text-base" /> },
    { id: 'conge', label: 'Congé', icon: <FaCalendarAlt className="text-base" /> },
    { id: 'statut', label: 'Statut', icon: <FaUserCheck className="text-base" /> }
  ]

  const salaryHistory = employer.salaires || []
  const congeHistory = employer.conges || []
  const formatNumber = (num: number) => num.toLocaleString('fr-FR')

  const handleMonthClick = (id: number) => {
    const updated = selectedMonths.includes(id)
      ? selectedMonths.filter((mid) => mid !== id)
      : [...selectedMonths, id]

    setSelectedMonths(updated)
    setValueSalary('mois', updated, { shouldValidate: true }) 
  }

  // Réinitialiser le formulaire lorsque l'onglet change
  useEffect(() => {
    resetSalary()
    resetConge()
    resetStatus()
    setSelectedMonths([])
  }, [activeTab, resetSalary, resetConge, resetStatus])

  const onSalarySubmit = (data: SalaireEmploye) => {
    console.log('Soumission du formulaire de salaire:', data)
    resetSalary()
    setSelectedMonths([])
  }

  const onCongeSubmit = (data: CongeType) => {
    console.log('Soumission du formulaire de congé:', data)
    resetConge()
  }

  const onStatusSubmit = (data: StatusFormInputs) => {
    console.log('Soumission du formulaire de statut:', data)
    resetStatus()
  }


const [selectedPayment, setSelectedPayment] = useState<SalaireEmploye | null>(null)
const printRef = useRef<HTMLDivElement>(null)
const handlePrint = (paiement: SalaireEmploye) => {
  setSelectedPayment(paiement)
  setTimeout(() => {
    if (!printRef.current) return
    const printContents = printRef.current.innerHTML
    if (!printContents) return
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
    window.location.reload()
  }, 200)
}


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-2xl h-[640px] rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header  */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#895256] to-[#6a4247] text-white p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white">
              {employer.nom[0]}
              {employer.prenom[0]}
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-tight">
                {employer.nom} {employer.prenom}
              </h2>
              <p className="text-xs opacity-90">
                {employer.fonction} | Salaire de base : {formatNumber(employer.salairebase ?? 0)} Ar
              </p>
            </div>
          </div>
          <button
            onClick={closemodal}
            className="text-white hover:text-gray-200 transition-transform duration-200 transform hover:scale-110"
            aria-label="Fermer"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Tabs  */}
        <div className="flex bg-gray-100 px-2 py-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'salaire' | 'conge' | 'statut')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-[#895256] shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <AnimatePresence mode="wait">
            {/* SALAIRE */}
            {activeTab === 'salaire' && (
              <motion.div
                key="salaire"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Paiement */}
                <form
                  onSubmit={handleSubmitSalary(onSalarySubmit)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Paiement du salaire</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Montant */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">Montant</label>
                      <input
                        type="number"
                        placeholder="Ex: 500000"
                        {...registerSalary('montant')}
                        className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                          errorsSalary.montant
                            ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                            : 'border-gray-300 shadow-sm'
                        }`}
                      />
                      {errorsSalary.montant && (
                        <p className="text-red-500 text-xs mt-1">{errorsSalary.montant.message}</p>
                      )}
                    </div>
                    {/* Type de paiement */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">
                        Type de paiement
                      </label>
                      <select
                        {...registerSalary('typePaiement')}
                        className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                          errorsSalary.typePaiement
                            ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                            : 'border-gray-300 shadow-sm'
                        }`}
                      >
                        <option value="">Sélectionner</option>
                        <option value="avance">Avance</option>
                        <option value="complet">Salaire complet</option>
                      </select>
                      {errorsSalary.typePaiement && (
                        <p className="text-red-500 text-xs mt-1">
                          {errorsSalary.typePaiement.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Motif */}
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-medium text-gray-600 mb-1">Motif</label>
                    <textarea
                      placeholder="Exemple : avance pour urgence médicale..."
                      rows={2}
                      {...registerSalary('motif')}
                      className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                        errorsSalary.motif
                          ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                          : 'border-gray-300 shadow-sm'
                      }`}
                    ></textarea>
                    {errorsSalary.motif && (
                      <p className="text-red-500 text-xs mt-1">{errorsSalary.motif.message}</p>
                    )}
                  </div>
                  {/* Sélection des mois  */}
                  <h2 className="mt-4 mb-2 font-semibold text-gray-800">Sélectionnez un mois</h2>
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-lg border-gray-200 bg-white shadow-inner">
                    {Monthlistedata.map((month) => {
                    const isSelected = selectedMonths.includes(month.id)
                      return (
                        <div
                          key={month.id}
                          onClick={() => handleMonthClick(month.id)}
                          className={`text-sm font-medium text-center rounded-lg px-2 py-2 cursor-pointer transition-all duration-200 border
                              ${
                                isSelected
                                  ? 'bg-[#895256] text-white border-[#895256] shadow-sm'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                              }`}
                        >
                          {month.name}
                        </div>
                      )
                    })}
                  </div>
                  {errorsSalary.mois && (
                    <p className="text-red-500 text-xs mt-1">{errorsSalary.mois.message}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full mt-4 py-2.5 bg-[#895256] text-white rounded-lg font-semibold hover:bg-[#6a4247] transition shadow-md flex items-center justify-center gap-2"
                  >
                    <FiSave /> Enregistrer
                  </button>
                </form>

                {/* Historique */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-md font-bold text-gray-700">Historique des paiements</h3>
                  </div>
                  {salaryHistory.length > 0 ? (
                    <ul className="space-y-2">
                      {salaryHistory.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {item.montant ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaTimes className="text-red-500" />
                            )}
                            <span className="font-medium text-gray-800">{item.mois}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">
                              {formatNumber(item.montant)} Ar
                            </span>
                            <button
                              onClick={() => handlePrint(item)}
                              className="p-1 rounded-md hover:bg-gray-100"
                              title="Imprimer le reçu"
                            >
                              <FaPrint className="text-gray-600" />
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100">
                              <FiEdit2 className="text-blue-500" />
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100">
                              <FiTrash2 className="text-red-500" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-gray-500 text-sm py-4">
                      Aucun historique de salaire disponible.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* CONGES */}
            {activeTab === 'conge' && (
              <motion.div
                key="conge"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <form
                  onSubmit={handleSubmitConge(onCongeSubmit)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Nouveau congé</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">
                        Date de début
                      </label>
                      <input
                        type="date"
                        {...registerConge('dateDebut')}
                        className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                          errorsConge.dateDebut
                            ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                            : 'border-gray-300 shadow-sm'
                        }`}
                      />
                      {errorsConge.dateDebut && (
                        <p className="text-red-500 text-xs mt-1">{errorsConge.dateDebut.message}</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">Date de fin</label>
                      <input
                        type="date"
                        {...registerConge('dateFin')}
                        className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                          errorsConge.dateFin
                            ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                            : 'border-gray-300 shadow-sm'
                        }`}
                      />
                      {errorsConge.dateFin && (
                        <p className="text-red-500 text-xs mt-1">{errorsConge.dateFin.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="text-sm font-medium text-gray-600 mb-1">Motif</label>
                    <input
                      type="text"
                      placeholder="Ex: Maladie, personnel..."
                      {...registerConge('motif')}
                      className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                        errorsConge.motif
                          ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                          : 'border-gray-300 shadow-sm'
                      }`}
                    />
                    {errorsConge.motif && (
                      <p className="text-red-500 text-xs mt-1">{errorsConge.motif.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 py-2.5 bg-[#895256] text-white rounded-lg font-semibold hover:bg-[#6a4247] transition shadow-md flex items-center justify-center gap-2"
                  >
                    <FiSave /> Enregistrer
                  </button>
                </form>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-md font-bold text-gray-700">Historique des congés</h3>
                  </div>
                  {congeHistory.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {congeHistory.map((item, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {new Date(item.dateDebut).toLocaleDateString('fr-FR')} →{' '}
                              {new Date(item.dateFin).toLocaleDateString('fr-FR')}
                            </p>
                            {item.motif && (
                              <span className="block text-xs italic text-gray-500 mt-0.5">
                                {item.motif}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-1 rounded-md hover:bg-gray-100">
                              <FiEdit2 className="text-blue-500" />
                            </button>
                            <button className="p-1 rounded-md hover:bg-gray-100">
                              <FiTrash2 className="text-red-500" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-gray-500 text-sm py-4">
                      Aucun historique de congé disponible.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STATUT */}
            {activeTab === 'statut' && (
              <motion.div
                key="statut"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <form
                  onSubmit={handleSubmitStatus(onStatusSubmit)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Mettre à jour le statut</h3>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">Nouveau statut</label>
                    <select
                      {...registerStatus('nouveauStatut')}
                      className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                        errorsStatus.nouveauStatut
                          ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                          : 'border-gray-300 shadow-sm'
                      }`}
                    >
                      <option value="">Sélectionner</option>
                      <option>Actif</option>
                      <option>En congé</option>
                      <option>Suspendu</option>
                    </select>
                    {errorsStatus.nouveauStatut && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorsStatus.nouveauStatut.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 py-2.5 bg-[#895256] text-white rounded-lg font-semibold hover:bg-[#6a4247] transition shadow-md flex items-center justify-center gap-2"
                  >
                    <FiSave /> Mettre à jour
                  </button>
                </form>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-center text-gray-500 text-sm py-4">
                    Aucun historique de statut disponible.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* avony ato nle impression  */}
      <div className="hidden">
        {selectedPayment && (
          <div ref={printRef}>
            <Recuepayementemploye employer={employer} salaire={selectedPayment} />
          </div>
        )}
      </div>
    </div>
  )
}
