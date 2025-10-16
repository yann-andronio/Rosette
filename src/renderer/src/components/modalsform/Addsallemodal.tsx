import { FiEdit, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'

import useMultiModals from '@renderer/hooks/useMultiModals'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { toast } from 'react-toastify'
import UpdateAddSalleForm from '../updatemodalparametres/UpdateAddSalleForm'

type AddsalleModalProps = {
  closemodal: () => void
}

type FormDataalefa = {
  cl_id: number
  nom_salle: string
  effectif: number
}

const Addsallemodal: React.FC<AddsalleModalProps> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [reload, setReload] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHistoriqueLoading, setIsHistoriqueLoading] = useState<boolean>(false)
  const [niveau, setNiveau] = useState<{ id: number; nom_classe: string }[]>([])
  const [historiques, setHistoriques] = useState<
    { id: number; nom_salle: string; effectif: number; classes: { nom_classe } }[]
  >([])

  const [salleToDelete, setSalleToDelete] = useState<{ id: number; nom_salle: string } | null>(null)
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)
  const { openModal, modal, closModal } = useMultiModals()

  const [salleToEdit, setSalleToEdit] = useState<any>(null)

  const getNiveau = async () => {
    setIsLoading(true)
    try {
      await axiosRequest('GET', 'classe-list-salle', null, 'token')
        .then(({ data }) => setNiveau(data))
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error.response?.data?.message))
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const deleteHistorique = async (id: number) => {
    try {
      await axiosRequest('DELETE', `salle-delete/${id}`, null, 'token')
        .then(({ data }) => toast.success(data?.message || 'Classe ajoutée ✅'))
        .then(() => setReload(!reload))
        .catch((error) =>
          toast.error(error?.response?.data?.message || 'Erreur lors de suppression ❌')
        )
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getNiveau()
  }, [activeTab === 'ajouter'])
  const schema = yup.object({
    cl_id: yup.number().required('Sélectionnez un niveau'),
    nom_salle: yup
      .string()
      .typeError(`Le nom de la salle doit être une chaîne de caractères`)
      .required('Le nom de la salle est requis'),
    effectif: yup
      .number()
      .typeError('L’effectif doit être un nombre')
      .positive('L’effectif doit être supérieur à 0')
      .integer('L’effectif doit être un entier')
      .required('L’effectif est requis')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormDataalefa>({ resolver: yupResolver(schema) })

  const selectedniveauForStyle = watch('cl_id')

  const onSubmit = async (data: FormDataalefa) => {
    setIsLoading(true)
    try {
      await axiosRequest('POST', 'salle-creation', data, 'token')
        .then(({ data }) => toast.success(data?.message || 'salle ajoutée ✅'))
        .then(() => setIsLoading(false))
        .then(() => setActiveTab('historique'))
        .catch((error) =>
          toast.error(error?.response?.data?.message || 'Erreur lors de la création ❌')
        )
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
    // console.log(data)
    reset()
  }

  const getHistorique = async () => {
    setIsHistoriqueLoading(true)
    try {
      await axiosRequest('GET', 'salle-list', null, 'token')
        .then(({ data }) => setHistoriques(data))
        .then(() => setIsHistoriqueLoading(false))
        .catch((error) => console.log(error.response?.data?.message))
        .finally(() => setIsHistoriqueLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }
  useEffect(() => {
    getHistorique()
  }, [activeTab === 'historique', reload])

  const handleclickDelete = (id: number, nom_salle: string) => {
    setSalleToDelete({ id, nom_salle })
    openModal('confirmDelete')
  }

  const handleConfirmDelete = async () => {
    if (!salleToDelete) return
    setIsDeletingLoader(true)
    try {
      await deleteHistorique(salleToDelete.id)
    } finally {
      setIsDeletingLoader(false)
      setSalleToDelete(null)
      //  closModal('confirmDelete')
    }
  }

  // Modif
  const handleclickEdit = (classeData: any) => {
    setSalleToEdit(classeData)
    openModal('updatesalle')
  }

  const handleUpdateSuccess = () => {
    setReload((r) => !r)
    closModal('updatesalle')
    setSalleToEdit(null)
  }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold">Ajouter une salle</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setActiveTab('ajouter')
                reset()
              }}
              className={`text-lg font-semibold transition ${
                activeTab === 'ajouter' ? 'text-[#895256]' : 'text-gray-400 hover:text-[#895256]'
              }`}
            >
              Ajouter
            </button>
            <button
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nom de la salle */}
            <div>
              <input
                type="text"
                placeholder="Nom de la salle (ex: Terminale 1A)"
                {...register('nom_salle')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.nom_salle
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.nom_salle && (
                <p className="text-sm text-red-400 mt-1">{errors.nom_salle.message}</p>
              )}
            </div>

            {/* Effectif */}
            <div>
              <input
                type="number"
                placeholder="Effectif d’élèves"
                {...register('effectif')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.effectif
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.effectif && (
                <p className="text-sm text-red-400 mt-1">{errors.effectif.message}</p>
              )}
            </div>

            {/* select du niveau */}
            {isLoading ? (
              <div className="flex w-full justify-center">
                <RotatingLines
                  visible={true}
                  width="55"
                  strokeColor="#7A3B3F"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            ) : (
              <div>
                <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez un niveau</h2>
                <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl  bg-white ">
                  {niveau.map(({ id, nom_classe }, index) => (
                    <div
                      key={index}
                      onClick={() => setValue('cl_id', id)}
                      className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${
                        selectedniveauForStyle === id
                          ? 'bg-[#895256] text-white border-[#895256]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {nom_classe}
                    </div>
                  ))}
                </div>
                {errors.cl_id && (
                  <p className="text-sm text-red-400 mt-1">{errors.cl_id.message}</p>
                )}
              </div>
            )}

            {/* Boutons */}
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
          <>
            {isHistoriqueLoading ? (
              <div className="flex w-full justify-center">
                <RotatingLines
                  visible={true}
                  width="55"
                  strokeColor="#7A3B3F"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            ) : (
              <div className="mt-4 max-h-64 overflow-auto">
                {historiques.length === 0 ? (
                  <p className="text-gray-500 text-center">Aucune salle ajoutée</p>
                ) : (
                  <ul className="space-y-3">
                    {historiques.map(({ id, nom_salle, effectif, classes }, index) => (
                      <li
                        key={index}
                        className="bg-white shadow-sm px-5 py-3 rounded-xl flex justify-between items-center border border-gray-200 hover:shadow-md transition"
                      >
                        <div className="flex flex-col text-left">
                          <span className="text-sm text-gray-700 font-medium">
                            Salle : {nom_salle}
                          </span>
                          <span className="text-sm text-[#895256]">
                            Niveau : {classes.nom_classe}
                          </span>
                          <span className="text-xs text-gray-500">
                            Effectif : {effectif} élèves
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            aria-label={`Modifier le niveaux}`}
                            onClick={() => handleclickEdit({ id, nom_salle, effectif, classes })}
                            className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                          >
                            <FiEdit size={18} />
                          </button>

                          <button
                            onClick={() => handleclickDelete(id, nom_salle)}
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
          </>
        )}
      </div>

      {modal.confirmDelete && salleToDelete && (
        <ConfirmDeleteModal
          title="Supprimer une salle"
          message={`Voulez-vous vraiment supprimer la salle ${salleToDelete.nom_salle} ?`}
          onConfirm={handleConfirmDelete}
          closemodal={() => closModal('confirmDelete')}
          isDeletingLoader={isDeletingLoader}
        />
      )}

      {modal.updatesalle && salleToEdit && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex items-center justify-center text-white gap-3 mb-5">
            <h1 className="text-2xl font-bold">Modifier la salle {salleToEdit.nom_salle}</h1>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in max-h-[90vh] overflow-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => closModal('updatesalle')}
                className="text-gray-600 hover:text-red-600 transition"
              >
                <FiX size={20} />
              </button>
            </div>

            <UpdateAddSalleForm
              SalleData={salleToEdit}
              niveau={niveau}
              onClose={() => closModal('updatesalle')}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Addsallemodal
