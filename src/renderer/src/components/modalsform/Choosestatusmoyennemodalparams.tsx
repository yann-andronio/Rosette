import { FiEdit, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import useMultiModals from '@renderer/hooks/useMultiModals'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import UpdateAdmissonForm from '../updatemodalparametres/UpdateAdmissonForm'

type ChosseCtausMoyenModalProps = {
  closemodal: () => void
}

type FormDataAlefa = {
  ac_id: string
  note: number
}

const Choosestatusmoyennemodalparams: React.FC<ChosseCtausMoyenModalProps> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [paramsList, setParamsList] = useState<{ ac_id: string; note: number }[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reload, setReload] = useState(false)
  const [histLoading, setHistLoading] = useState<boolean>(false)
  const [acs, setAcs] = useState<{ id: number; annee: string }[]>([])
  const [historiques, setHistoriques] = useState<
    { id: number; note: number; acs: { id: number; annee: string } }[]
  >([])

  const [noteadmissionToDelete, setnoteadmissionToDelete] = useState<{
    id: number
    note: number
    acs: { id: number; annee: string }
  } | null>(null)
  const { openModal, modal, closModal } = useMultiModals()
  const [isDeletingLoader, setIsDeletingLoader] = useState<boolean>(false)

  const [moyenneadmToEdit, setmoyenneadmToEdit] = useState<any>(null)

  const getAcs = async () => {
    setIsLoading(true)
    try {
      await axiosRequest('GET', 'ac-list', null, 'token')
        .then(({ data }) => setAcs(data))
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error.response?.data?.message))
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getAcs()
  }, [activeTab === 'ajouter'])
  const schema = yup.object({
    ac_id: yup.string().required('Sélectionnez une année'),
    note: yup
      .number()
      .typeError('La moyenne doit être un nombre')
      .required('La moyenne est requise')
      .min(0, 'La moyenne ne peut pas être négative')
      .max(20, 'La moyenne ne peut pas dépasser 20')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormDataAlefa>({ resolver: yupResolver(schema) })

  const selectednoteadmissionforstyle = watch('ac_id')

  const onSubmit = async (data: FormDataAlefa) => {
    setIsLoading(true)
    try {
      await axiosRequest('POST', 'admission-creation', data, 'token')
        .then(({ data }) => toast.success(data?.message || 'Admission creé ✅'))
        .then(() => setIsLoading(false))
        .then(() => setActiveTab('historique'))
        .catch((error) =>
          toast.warning(
            error?.response?.data?.message || ` Erreur lors de la création d' admission ❌`
          )
        )
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getHistoriques = async () => {
    setHistLoading(true)
    try {
      await axiosRequest('GET', 'admission-list', null, 'token')
        .then(({ data }) => setHistoriques(data))
        .then(() => setHistLoading(false))
        .catch((error) => console.log(error.response?.data?.message))
        .finally(() => setHistLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getHistoriques()
  }, [activeTab === 'historique', reload])

  const deletes = async (id: number) => {
    try {
      await axiosRequest('DELETE', `admission-delete/${id}`, null, 'token')
        .then(({ data }) => toast.success(data?.message || `note d' admission supprimée ✅`))
        .then(() => setReload(!reload))
        .catch((error) => console.log(error.response?.data?.message))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const handleclickDelete = (id: number, note: number, acs: { id: number; annee: string }) => {
    setnoteadmissionToDelete({ id, note, acs })
    openModal('confirmDelete')
  }

  const handleConfirmDelete = async () => {
    if (!noteadmissionToDelete) return
    setIsDeletingLoader(true)
    try {
      await deletes(noteadmissionToDelete.id)
    } finally {
      setIsDeletingLoader(false)
      setnoteadmissionToDelete(null)
      //  closModal('confirmDelete')
    }
  }

  // Modif
  const handleclickEdit = (MoyenneAdmData: any) => {
    setmoyenneadmToEdit(MoyenneAdmData)
    openModal('updateniveaux')
  }

  const handleUpdateSuccess = () => {
    setReload((r) => !r)
    closModal('updateniveaux')
    setmoyenneadmToEdit(null)
  }

  

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold ">Réglage d' admission</h1>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="number"
                placeholder="Moyenne d’admission (ex: 10)"
                step="0.01"
                {...register('note')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.note
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.note && <p className="text-sm text-red-400 mt-1">{errors.note.message}</p>}
            </div>

            <div className="mt-6">
              <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez une année</h2>

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
                <>
                  {' '}
                  <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl border-gray-300 bg-white">
                    {acs.map((noteadmission, index) => (
                      <div
                        key={index}
                        onClick={() => setValue('ac_id', noteadmission.id.toString())}
                        className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${
                          selectednoteadmissionforstyle === noteadmission.id.toString()
                            ? 'bg-[#895256] text-white border-[#895256]'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {noteadmission.annee}
                      </div>
                    ))}{' '}
                  </div>
                </>
              )}

              {errors.ac_id && <p className="text-sm text-red-400 mt-1">{errors.ac_id.message}</p>}
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
          <>
            {histLoading ? (
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
              <>
                {' '}
                <div className="mt-4 max-h-64 overflow-auto">
                  {historiques.length === 0 ? (
                    <p className="text-gray-500 text-center">Aucun paramètre ajouté</p>
                  ) : (
                    <ul className="space-y-3">
                      {historiques.map(({ id, acs, note }, index) => (
                        <li
                          key={index}
                          className="bg-white shadow-sm px-5 py-3 rounded-xl flex justify-between items-center border border-gray-200 hover:shadow-md transition"
                        >
                          <div className="flex flex-col text-left">
                            <span className="text-sm text-gray-500">
                              {' '}
                              Année : {acs?.annee || 'N/A'}
                            </span>
                            <span className="text-sm text-[#895256] font-medium mt-1">
                              Moyenne : {note}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              aria-label={`Modifier le niveaux}`}
                              onClick={() => handleclickEdit({ id, acs, note })}
                              className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                            >
                              <FiEdit size={18} />
                            </button>

                            <button
                              onClick={() => handleclickDelete(id, note, acs)}
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
              </>
            )}
          </>
        )}
      </div>

      {modal.confirmDelete && noteadmissionToDelete && (
        <ConfirmDeleteModal
          title="Supprimer la note d' admission"
          message={`Voulez-vous vraiment supprimer la note d'admission de  ${noteadmissionToDelete.note} pour l'année scolaire ${noteadmissionToDelete.acs.annee} ?`}
          onConfirm={handleConfirmDelete}
          closemodal={() => closModal('confirmDelete')}
          isDeletingLoader={isDeletingLoader}
        />
      )}

      {modal.updateniveaux && moyenneadmToEdit && acs.length > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex items-center justify-center text-white gap-3 mb-5">
            <h1 className="text-2xl font-bold">
              Modifier la note d'admission {moyenneadmToEdit.note}
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in max-h-[90vh] overflow-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => closModal('updateniveaux')}
                className="text-gray-600 hover:text-red-600 transition"
              >
                <FiX size={20} />
              </button>
            </div>

            <UpdateAdmissonForm
              myenneadmdata={moyenneadmToEdit}
              years={acs}
              onClose={() => closModal('updateniveaux')}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Choosestatusmoyennemodalparams
