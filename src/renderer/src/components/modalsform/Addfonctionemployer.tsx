import { FiPlus, FiX, FiTrash2, FiEdit } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import UpdateForSimpleInput from '../updatemodalparametres/UpdateForSimpleInput'
import useMultiModals from '@renderer/hooks/useMultiModals'

type AddFunctionProps = {
  closemodal: () => void
}

type FormData = {
  profession: string
}

interface HistoriqueItem {
  profession: string
  id: number
}

interface FonctionToDelet {
  id: number
  profession: string
}

const schema = yup.object({
  profession: yup.string().required('Vous devez saisir une fonction')
})

const Addfonctionemployer: React.FC<AddFunctionProps> = ({ closemodal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [historiques, setHistoriques] = useState<HistoriqueItem[]>([])
  const [reload, setReload] = useState<boolean>(false)
  const [fonctionToDelet, setFonctionToDelet] = useState<FonctionToDelet | null>(null)
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)

    const { openModal, modal, closModal } = useMultiModals()
    const [editData, setEditData] = useState<{ id: number; value: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const getHistoriques = async () => {
    try {
      await axiosRequest('GET', 'profession-list', null, 'token')
        .then(({ data }) => setHistoriques(data))
        .catch((error) => console.log(error))
    } catch (e) {
      console.log('Le serveur ne répond pas')
    }
  }

  useEffect(() => {
    getHistoriques()
  }, [reload, activeTab])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await axiosRequest('POST', 'profession-creation', data, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => reset())
        .then(() => setActiveTab('historique'))
        .catch((error) => toast.error(error?.response?.data?.message || "Erreur lors de l'ajout"))
        .finally(() => setIsLoading(false))
    } catch (err) {
      console.error('Le serveur ne répond pas', err)
      setIsLoading(false)
    }
  }

  const removeHistorique = async (id: number) => {
    try {
      await axiosRequest('DELETE', `profession/${id}`, null, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setReload(!reload))
        .catch((error) =>
          toast.error(error?.response?.data?.message || 'Erreur lors de la suppression')
        )
    } catch (e) {
      console.log('Le serveur ne répond pas')
    }
  }

  const handleclickDelete = (id: number, profession: string) => {
    setFonctionToDelet({ id, profession })
  }

  const handleConfirmDelete = async () => {
    if (!fonctionToDelet) return

    setIsDeletingLoader(true)
    try {
      await removeHistorique(fonctionToDelet.id)
    } finally {
      setIsDeletingLoader(false)
      setFonctionToDelet(null)
    }
  }

  const handleCloseDeleteModal = () => {
    setFonctionToDelet(null)
  }

    const handleClickEdit = (item: { id: number; profession?: string }) => {
      const value = item.profession || ''
      setEditData({ id: item.id, value })
      openModal('updateprofession')
    }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold ">Ajouter une fonction</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('ajouter')}
              className={`text-lg font-semibold transition ${
                activeTab === 'ajouter' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'
              }`}
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('historique')}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Ex: Professeur"
              {...register('profession')}
              className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                errors.profession
                  ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                  : 'border-gray-300 shadow-sm'
              }`}
            />
            {errors.profession && (
              <p className="text-sm text-red-400">{errors.profession.message}</p>
            )}

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
                className="px-5 py-2 rounded-lg bg-[#895256] text-white hover:bg-[#733935] transition font-semibold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <ThreeDots visible={true} height="20" width="50" color="white" radius="9" />
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
              <p className="text-center text-gray-500">Aucune fonction ajoutée</p>
            ) : (
              <ul className="space-y-3">
                {historiques.map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-100 p-4 rounded-md flex justify-between items-center hover:bg-gray-200 transition"
                  >
                    <span className="font-semibold">{item.profession}</span>
                    <div className="flex space-x-2">
                      <button
                        aria-label={`Modifier le niveaux}`}
                        onClick={() => handleClickEdit(item)}
                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        aria-label={`Supprimer la fonction ${item.profession}`}
                        onClick={() => handleclickDelete(item.id, item.profession)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
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

      {fonctionToDelet && (
        <ConfirmDeleteModal
          title="Supprimer la fonction"
          message={`Voulez-vous vraiment supprimer la fonction "${fonctionToDelet.profession}" ?`}
          onConfirm={handleConfirmDelete}
          closemodal={handleCloseDeleteModal}
          isDeletingLoader={isDeletingLoader}
        />
      )}

      {modal.updateprofession && editData && (
        <UpdateForSimpleInput
          id={editData.id}
          defaultValue={editData.value}
          fieldName="profession"
          title="Modifier cette profession"
          placeholder="EX: Professeur"
          updateUrl="profession-update"
          closemodal={() => closModal('updateprofession')}
          reload={() => setReload(!reload)}
        />
      )}
    </div>
  )
}

export default Addfonctionemployer
