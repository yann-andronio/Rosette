import { FiX, FiPlus, FiEdit, FiTrash2, FiCheck } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { ThreeDots, RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import ConfirmDeleteModal from '@renderer/components/modalsform/ConfirmDeleteModal'
import useMultiModals from '@renderer/hooks/useMultiModals'

type Props = {
  closemodal: () => void
}

type FormData = {
  prescolaire: string
  primaire: string
  college: string
}

type MonthRecord = {
  id: number
  prescolaire: string
  primaire: string
  college: string
  ac_id?: number
  acs?: { annee: string }
}

const TransMajDebut = (str: string): string =>
  str
    .split(',')
    .map((s) => {
      const trimmed = s.trim()
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
    })
    .join(', ')

const monthListRegex = /^[A-Za-zÀ-ÿ]+(,\s*[A-Za-zÀ-ÿ]+)*$/

const schema = yup.object({
  prescolaire: yup
    .string()
    .required('Le champ Préscolaire est requis')
    .matches(monthListRegex, 'Format invalide (ex: Janvier, Mars)'),
  primaire: yup
    .string()
    .required('Le champ Primaire est requis')
    .matches(monthListRegex, 'Format invalide (ex: Janvier, Mars)'),
  college: yup
    .string()
    .required('Le champ Collège est requis')
    .matches(monthListRegex, 'Format invalide (ex: Janvier, Mars)')
})

const MoisAnneeScolaireModal: React.FC<Props> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [historiques, setHistoriques] = useState<MonthRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isListLoading, setIsListLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [itemDeleting, setitemDeleting] = useState<MonthRecord | null>(null)
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)
  const [editingRecord, setEditingRecord] = useState<MonthRecord | null>(null)
  const { openModal, modal, closModal } = useMultiModals()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const getHistoriques = async () => {
    setIsListLoading(true)
    try {
      await axiosRequest('GET', 'monthbylevels', null, 'token')
        .then(({ data }) => setHistoriques(data))
        .catch((err) => console.log(err?.response?.data?.message))
        .finally(() => setIsListLoading(false))
    } catch (err) {
      console.log('Le serveur ne répond pas')
    }
  }

  useEffect(() => {
    getHistoriques()
  }, [reload])

  const onSubmit = async (data: FormData) => {
    const payload = {
      prescolaire: TransMajDebut(data.prescolaire),
      primaire: TransMajDebut(data.primaire),
      college: TransMajDebut(data.college)
    }

    setIsLoading(true)
    try {
      if (editingRecord) {
        await axiosRequest('PUT', `monthbylevels/${editingRecord.id}`, payload, 'token')
          .then(({ data }) => toast.success(data.message))
          .then(() => {
            setReload((r) => !r)
            setEditingRecord(null)
            setActiveTab('historique')
          })
          .catch((err) => toast.error(err.response?.data?.message || 'Erreur'))
      } else {
        await axiosRequest('POST', 'monthbylevels', payload, 'token')
          .then(({ data }) => toast.success(data.message))
          .then(() => {
            setReload((r) => !r)
            setActiveTab('historique')
          })
          .catch((err) => toast.error(err.response?.data?.message || 'Erreur'))
      }
    } catch (err) {
      console.log(err)
      toast.error('Erreur serveur')
    } finally {
      setIsLoading(false)
      reset()
    }
  }

  const handleEdit = (record: MonthRecord) => {
    setEditingRecord(record)
    setValue('prescolaire', record.prescolaire)
    setValue('primaire', record.primaire)
    setValue('college', record.college)
    setActiveTab('ajouter')
  }

  const handleClickDelete = (record: MonthRecord) => {
    setitemDeleting(record)
    openModal('confirmDeleteMois')
  }

  const handleConfirmDelete = async () => {
    if (!itemDeleting) return
    setIsDeletingLoader(true)
    try {
      await axiosRequest('DELETE', `monthbylevels/${itemDeleting.id}`, null, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setReload((r) => !r))
        .catch((err) => toast.error(err.response?.data?.message || 'Erreur lors de la suppression'))
    } catch (err) {
      console.log(err)
      toast.error('Erreur serveur')
    } finally {
      setIsDeletingLoader(false)
      setitemDeleting(null)
      closModal('confirmDeleteMois')
    }
  }

  const handleTabChange = (tab: 'ajouter' | 'historique') => {
    if (tab === 'ajouter' && editingRecord) {
      setEditingRecord(null)
      reset()
    }
    if (tab === 'ajouter') reset()
    setActiveTab(tab)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold">Mois d&apos;Année Scolaire</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in max-h-[90vh] overflow-auto">
        {/* Header tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => handleTabChange('ajouter')}
              className={`text-lg font-semibold transition ${
                activeTab === 'ajouter' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'
              }`}
            >
              {editingRecord ? 'Modifier' : 'Ajouter'}
            </button>
            <button
              onClick={() => handleTabChange('historique')}
              className={`text-lg font-semibold transition ${
                activeTab === 'historique' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'
              }`}
            >
              Historique
            </button>
          </div>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <FiX size={20} />
          </button>
        </div>

        {activeTab === 'ajouter' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Préscolaire */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Préscolaire <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Janvier, Mars, Juin"
                {...register('prescolaire')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.prescolaire
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />

              {errors.prescolaire && (
                <p className="text-sm text-red-400 mt-1">{errors.prescolaire.message}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Séparez les mois par une virgule (ex: Janvier, Mars, Juin)
              </p>
            </div>

            {/* Primaire */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Primaire <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Janvier, Février, Avril"
                {...register('primaire')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.primaire
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.primaire && (
                <p className="text-sm text-red-400 mt-1">{errors.primaire.message}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">Séparez les mois par une virgule</p>
            </div>

            {/* Collège */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Collège <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Octobre, Novembre, Décembre"
                {...register('college')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.college
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.college && (
                <p className="text-sm text-red-400 mt-1">{errors.college.message}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">Séparez les mois par une virgule</p>
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={closemodal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white transition-all font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#895256] text-white hover:bg-[#733935] transition font-semibold flex items-center gap-2"
              >
                {isLoading ? (
                  <ThreeDots
                    visible={true}
                    height="20"
                    width="50"
                    color="pink"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                ) : editingRecord ? (
                  <>
                    <FiCheck size={18} /> Modifier
                  </>
                ) : (
                  <>
                    <FiPlus size={18} /> Ajouter
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-2 max-h-[60vh] overflow-auto">
            {isListLoading ? (
              <div className="flex w-full justify-center py-6">
                <RotatingLines
                  visible={true}
                  width="50"
                  strokeColor="#7A3B3F"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            ) : historiques.length === 0 ? (
              <p className="text-gray-500 text-center py-6">Aucune configuration ajoutée</p>
            ) : (
              <ul className="space-y-3">
                {historiques.map((record) => (
                  <li
                    key={record.id}
                    className="bg-white shadow-sm px-5 py-4 rounded-xl flex justify-between items-start border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="flex flex-col text-left gap-1">
                      {record.acs?.annee && (
                        <span className="text-xs text-gray-400 mb-1">
                          Année : {record.acs.annee}
                        </span>
                      )}
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Préscolaire
                        </span>
                        <p className="text-sm text-[#895256] font-medium">{record.prescolaire}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Primaire
                        </span>
                        <p className="text-sm text-[#895256] font-medium">{record.primaire}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Collège
                        </span>
                        <p className="text-sm text-[#895256] font-medium">{record.college}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                        aria-label="Modifier"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleClickDelete(record)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                        aria-label="Supprimer"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {modal.confirmDeleteMois && itemDeleting && (
        <ConfirmDeleteModal
          title="Supprimer la configuration"
          message={`Voulez-vous vraiment supprimer cette configuration de mois ?`}
          onConfirm={handleConfirmDelete}
          closemodal={() => {
            closModal('confirmDeleteMois')
            setitemDeleting(null)
          }}
          isDeletingLoader={isDeletingLoader}
        />
      )}
    </div>
  )
}

export default MoisAnneeScolaireModal
