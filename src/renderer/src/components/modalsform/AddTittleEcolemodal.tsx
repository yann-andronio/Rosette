import { FiEdit, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'
import useMultiModals from '@renderer/hooks/useMultiModals'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { ThreeDots } from 'react-loader-spinner'
import { formatDate } from '@renderer/utils/FormatDate'
import UpdateTitreEcoleForm from '../modalv2/parameters/UpdateTitreEcoleForm'

type OperationProps = { closemodal: () => void }

interface FormValues {
  name: string
  owner: string
  telephone: string
  email: string
  adresse: string
  decision: string
  code: string
}

const schema = yup.object({
  name: yup.string().required('Le titre est requis'),
  owner: yup.string().required('Le Directeur est requis'),
  telephone: yup.string().required('Le téléphone est requis'),
  email: yup.string().required("L'email est requis"),
  adresse: yup.string().required("L'adresse est requise"),
  decision: yup.string().required('La décision est requise'),
  code: yup.string().required('Le code est requis')
})

const champsFormulaire: {
  name: keyof FormValues
  label: string
  placeholder: string
  type?: string
}[] = [
  { name: 'name', label: "Titre de l'établissement", placeholder: 'Ex: ROSETTE II' },
  { name: 'owner', label: 'Directeur', placeholder: 'Ex: Jean Dupont' },
  { name: 'telephone', label: 'Téléphone', placeholder: 'Ex: 034 00 000 00', type: 'tel' },
  { name: 'email', label: 'Email', placeholder: 'Ex: ecole@example.com', type: 'email' },
  { name: 'adresse', label: 'Adresse', placeholder: 'Ex: Lot II A 123 Antananarivo' },
  { name: 'decision', label: 'Décision', placeholder: 'Ex: Décision N° 001/2024' },
  { name: 'code', label: 'Code', placeholder: 'Ex: SCO-001' }
]

export default function Addtitremodal({ closemodal }: OperationProps) {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [historiques, setHistoriques] = useState<
    {
      id: number
      name: string
      owner: string
      telephone: string
      email: string
      adresse: string
      decision: string
      code: string
      created_at: string
    }[]
  >([])

  const [reload, setReload] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editData, setEditData] = useState<{
    id: number
    name: string
    owner: string
    telephone: string
    email: string
    adresse: string
    decision: string
    code: string
  } | null>(null)
  const [titreToDelet, settitreToDelet] = useState<{ id: number; name: string } | null>(null)
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)
  const { openModal, modal, closModal } = useMultiModals()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      owner: '',
      telephone: '',
      email: '',
      adresse: '',
      decision: '',
      code: ''
    }
  })

  const getHistoriques = async () => {
    try {
      await axiosRequest('GET', 'school', null, 'token')
        .then(({ data }) => setHistoriques(Array.isArray(data) ? data : [data]))
        .catch((error) => console.log(error))
    } catch (e) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getHistoriques()
  }, [activeTab, reload])

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      await axiosRequest('POST', 'school', data, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => reset())
        .then(() => setActiveTab('historique'))
        .catch((error) => toast.error(error.response.data.message))
    } catch (err) {
      console.error('Le serveur ne repond pas')
    } finally {
      setIsLoading(false)
    }
  }

  const removeHistorique = async (id: number) => {
    try {
      await axiosRequest('DELETE', `school/${id}`, id, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setReload(!reload))
        .catch((error) => console.log(error))
    } catch (e) {
      console.log('Le serveur ne repond pas')
    }
  }

  const handleclickDelete = (id: number, name: string) => {
    settitreToDelet({ id, name })
    openModal('confirmDelete')
  }

  const handleConfirmDelete = async () => {
    if (!titreToDelet) return
    setIsDeletingLoader(true)
    try {
      await removeHistorique(titreToDelet.id)
    } finally {
      setIsDeletingLoader(false)
      settitreToDelet(null)
      closModal('confirmDelete')
    }
  }

  const handleClickEdit = (item: {
    id: number
    name: string
    owner: string
    telephone: string
    email: string
    adresse: string
    decision: string
    code: string
  }) => {
    setEditData(item)
    openModal('updatetitre')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold">Configuration du Titre de l&apos; établissement</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            {(['ajouter', 'historique'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab)
                  reset()
                }}
                className={`text-lg font-semibold transition ${
                  activeTab === tab ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <FiX size={20} />
          </button>
        </div>

        {/* ── Formulaire ── */}
        {activeTab === 'ajouter' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {champsFormulaire.map(({ name, label, placeholder, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                <input
                  type={type || 'text'}
                  {...register(name)}
                  placeholder={placeholder}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors[name]
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                />
                {errors[name] && (
                  <p className="text-sm text-red-600 font-medium mt-1">{errors[name]?.message}</p>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={closemodal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white transition font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#895256] text-white hover:bg-[#733935] transition font-semibold flex items-center gap-2"
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
          /* ── Historique ── */
          <div className="space-y-4">
            {historiques.length === 0 ? (
              <p className="text-center text-gray-500">Aucun établissement enregistré</p>
            ) : (
              <ul className="space-y-3">
                {historiques.map(
                  ({ id, name, owner, telephone, email, adresse, decision, code, created_at }) => (
                    <li
                      key={id}
                      className="bg-white shadow-sm px-5 py-4 rounded-xl border border-gray-200 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1 text-sm">
                          <p className="text-xs text-gray-400 mb-1">
                            Date : {formatDate(created_at)}
                          </p>
                          <p className="font-semibold text-gray-800">
                            <span className="text-gray-500 font-normal">Titre : </span>
                            {name}
                          </p>
                          <p className="text-[#895256] font-medium">
                            <span className="text-gray-500 font-normal">Directeur : </span>
                            {owner}
                          </p>
                          <p className="text-[#895256] font-medium">
                            <span className="text-gray-500 font-normal">Téléphone : </span>
                            {telephone}
                          </p>
                          <p className="text-[#895256] font-medium">
                            <span className="text-gray-500 font-normal">Email : </span>
                            {email}
                          </p>
                          <p className="text-[#895256] font-medium">
                            <span className="text-gray-500 font-normal">Adresse : </span>
                            {adresse}
                          </p>
                          <p className="text-[#895256] font-medium">
                            <span className="text-gray-500 font-normal">Décision : </span>
                            {decision}
                          </p>
                          <p className="text-[#895256] font-medium">
                            <span className="text-gray-500 font-normal">Code : </span>
                            {code}
                          </p>
                        </div>

                        <div className="flex space-x-2 ml-4 shrink-0">
                          <button
                            aria-label="Modifier le titre"
                            onClick={() =>
                              handleClickEdit({  id,  name,  owner,  telephone,  email,  adresse,  decision,  code})
                            }
                            className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleclickDelete(id, name)}
                            className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      {modal.confirmDelete && titreToDelet && (
        <ConfirmDeleteModal
          title="Supprimer le titre"
          message={`Voulez-vous vraiment supprimer le titre "${titreToDelet.name}" de l'établissement ?`}
          onConfirm={handleConfirmDelete}
          closemodal={() => closModal('confirmDelete')}
          isDeletingLoader={isDeletingLoader}
        />
      )}

      {modal.updatetitre && editData && (
        <UpdateTitreEcoleForm
          ecoleData={editData}
          closemodal={() => closModal('updatetitre')}
          onUpdateSuccess={() => {
            setReload(!reload)
            closModal('updatetitre')
          }}
        />
      )}
    </div>
  )
}
