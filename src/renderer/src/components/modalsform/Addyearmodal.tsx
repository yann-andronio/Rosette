import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { Monthlistedata } from '@renderer/data/Monthlistedata'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import useMultiModals from '@renderer/hooks/useMultiModals'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type YearProps = {
  closemodal: () => void
}

type FormDataAlefa = {
  yearadd: string
  selectedMonths: (number | undefined)[]
}

const Addyearmodal: React.FC<YearProps> = ({ closemodal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [historiques, setHistoriques] = useState<{ annee: string; id: number; mois: { mois: string }[] }[]>([])
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])

  const [yearToDelete, setYearToDelete] = useState<{ id: number; annee: string } | null>(null)
  const { openModal, modal, closModal } = useMultiModals()
  const [isDeletingLoader, setIsDeletingLoader] = useState<boolean>(false)

  const schema = yup.object({
    yearadd: yup.string().required('Vous devez saisir une année'),
    selectedMonths: yup
      .array()
      .of(yup.number())
      .min(1, 'Sélectionnez au moins un mois')
      .required('Sélectionnez au moins un mois')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormDataAlefa>({
    resolver: yupResolver(schema)
  })

  const handleMonthClick = (id: number) => {
    const updated = selectedMonths.includes(id)
      ? selectedMonths.filter((mid) => mid !== id)
      : [...selectedMonths, id]
    setSelectedMonths(updated)
    setValue('selectedMonths', updated)
  }

  const getHistorique = async () => {
    setIsLoading(true)
    try {
      await axiosRequest('GET', 'ac-list', null, 'token')
        .then(({ data }) => setHistoriques(data))
        .catch((error) => console.log(error?.response?.data?.error))
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getHistorique()
  }, [activeTab === 'historique', reload])

  const onSubmit = async (data) => {
    const donneAlefa = {
      annee: data.yearadd,
      mois: Monthlistedata.filter((m) => data.selectedMonths.includes(m.id)).map((m) => m.name)
    }

    setIsLoading(true)
    try {
      await axiosRequest('POST', 'ac-creation', donneAlefa, 'token')
        .then(({ data }) => toast.success(data?.message || 'Création réussie ✅'))
        .then(() => setActiveTab('historique'))
        .catch((error) =>
          toast.error(error?.response?.data?.message || 'Erreur lors de la création ❌')
        )
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne répond pas')
      toast.error('Le serveur ne répond pas ❌')
    }
    reset()
  }

  const removeYear = async (id: number) => {
    setIsLoading(true)
    try {
      await axiosRequest('DELETE', `ac-delete/${id}`, null, 'token')
        .then(({ data }) => toast.success(data?.message || 'Année supprimée ✅'))
        .finally(() => setIsLoading(false))
      setReload((r) => !r)
    } catch (error) {
      console.log('Le serveur ne repond pas')
      toast.error('Le serveur ne répond pas ❌')
      setIsLoading(false)
    }
  }

  const handleclickDelete = (id: number, annee: string) => {
    setYearToDelete({ id, annee })
    openModal('confirmDelete')
  }

 const handleConfirmDelete = async () => {
   if (!yearToDelete) return
   setIsDeletingLoader(true)
   try {
     await removeYear(yearToDelete.id)
   } finally {
     setIsDeletingLoader(false)
     setYearToDelete(null)
    //  closModal('confirmDelete')
   }
 }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab('ajouter')
                reset()
                setSelectedMonths([])
              }}
              className={`text-lg font-semibold transition ${activeTab === 'ajouter' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'}`}
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('historique')}
              className={`text-lg font-semibold transition ${activeTab === 'historique' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'}`}
            >
              Historique
            </button>
          </div>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <FiX size={20} />
          </button>
        </div>

        {activeTab === 'ajouter' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Ex: 2025"
              {...register('yearadd')}
              className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${errors.yearadd ? 'border-red-500 shadow-[0_0_5px_#f87171]' : 'border-gray-300 shadow-sm'}`}
            />
            {errors.yearadd && (
              <p className="text-sm text-red-400 mt-1">{errors.yearadd.message}</p>
            )}

            <div className="mt-6">
              <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez les mois</h2>
              <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl border-gray-300 bg-white">
                {Monthlistedata.map((month) => {
                  const isSelected = selectedMonths.includes(month.id)
                  return (
                    <div
                      key={month.id}
                      onClick={() => handleMonthClick(month.id)}
                      className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${isSelected ? 'bg-[#895256] text-white border-[#895256]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                      {month.name}
                    </div>
                  )
                })}
              </div>
              {errors.selectedMonths && (
                <p className="text-sm text-red-400 mt-1">{errors.selectedMonths.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
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
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    <FiPlus size={18} /> Ajouter
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 max-h-[400px] overflow-auto">
            {historiques.length === 0 ? (
              <p className="text-center text-gray-500">Aucune année ajoutée</p>
            ) : (
              <ul className="space-y-3">
                {historiques.map(({ annee, id, mois }, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-md flex justify-between items-center hover:bg-gray-200 transition"
                  >
                    <div>
                      <p className="font-semibold">Année : {annee}</p>
                      <p className="text-sm text-gray-700">
                        Mois :{' '}
                        {mois.map((m, index) => (
                          <span key={index}>
                            {m?.mois + (index !== mois.length - 1 ? ', ' : '')}
                          </span>
                        ))}
                      </p>
                    </div>
                    <button
                      aria-label={`Supprimer l'année ${annee}`}
                      onClick={() => handleclickDelete(id, annee)}
                      className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {modal.confirmDelete && yearToDelete && (
        <ConfirmDeleteModal
          title="Supprimer l'année"
          message={`Voulez-vous vraiment supprimer l'année ${yearToDelete.annee} ?`}
          onConfirm={handleConfirmDelete}
          closemodal={() => closModal('confirmDelete')}
          isDeletingLoader={isDeletingLoader}
        />
      )}
    </div>
  )
}

export default Addyearmodal
