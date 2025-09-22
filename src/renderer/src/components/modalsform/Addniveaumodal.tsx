import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { toast } from 'react-toastify'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { id } from 'date-fns/locale'
type ClassModalProps = {
  closemodal: () => void
}

type FormDataAlefa = {
  nom_classe: string,
  ac_id: string,
  ecolage: number,
  kermesse:number,
  droit:number
}

const Addniveaumodal: React.FC<ClassModalProps> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [historiques, setHistoriques] = useState<{ id:number, nom_classe: string, ac_id: string, ecolage: number, acs:{annee:string} }[]>([])


  const [isYearsLloading, setIsYearsLloading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [years, setYears] = useState<{id:number, annee:string}[]>([])
  const [reload, setReload] = useState(true)

  const [classeToDelete, setclasseToDelete] = useState<{ id: number, nom_classe: string } | null>(null)
   const [isDeletingLoader, setIsDeletingLoader] = useState(false)
  const { openModal, modal, closModal } = useMultiModals()

const deleteHistorique = async (id:number) => {
    try{
      await axiosRequest('DELETE', `classe-delete/${id}`, null, 'token')
        .then(({ data }) => toast.success(data?.message || 'Classe supprimée ✅'))
        .then(() => setReload(!reload))
        .catch((error) => console.log(error.response?.data?.message))
    }catch(error) {
      console.log('Le serveur ne repond pas')
    }
}
  const getYears = async ()=> {
    setIsYearsLloading(true)
    try{
      await axiosRequest('GET', 'ac-list-no-month', null, 'token')
        .then(({data}) => setYears(data))
        .then(() => setIsYearsLloading(false))
        .catch(error => console.log(error.response?.data?.message))
        .finally(() => setIsYearsLloading(false))
    }catch(error){
      console.log('le serveur ne repond pas')
    }
  }

  const getClassesHistorique = async ()=> {
    setIsLoading(true)
    try{
      await axiosRequest('GET', 'classe-list', null, 'token')
        .then(({data}) => setHistoriques(data))
        .then(() => setIsLoading(false))
        .catch(error => console.log(error.response?.data?.message))
        .finally(() => setIsLoading(false))
    }catch(error){
      console.log('le serveur ne repond pas')
    }
  }



  useEffect(() => {
    getYears()
    getClassesHistorique()

  }, [activeTab, reload])
  const schema = yup.object({
    nom_classe: yup.string().required('Vous devez saisir un nom de classe'),
    ac_id: yup.string().required('Sélectionnez une année'),
    ecolage: yup
      .number()
      .typeError('Le montant doit être un nombre')
      .required('Le montant est requis')
      .min(0, 'Le montant ne peut pas être négatif'),
    kermesse:yup
      .number()
      .typeError('Le montant doit être un nombre')
      .required('Le montant est requis')
      .min(0, 'Le montant ne peut pas être négatif'),
    droit:yup
      .number()
      .typeError('Le montant doit être un nombre')
      .required('Le montant est requis')
      .min(0, 'Le montant ne peut pas être négatif'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormDataAlefa>({ resolver: yupResolver(schema) })

  const selectedYearforstyle = watch('ac_id')

  const onSubmit = async (data: FormDataAlefa) => {
    const donneAlefa = {
      nom_classe: data.nom_classe,
      ac_id: data.ac_id,
      ecolage: data.ecolage,
      droit:data.droit,
      kermesse:data.kermesse,
    }

    setIsLoading((true))
    try {
      await axiosRequest('POST', 'classe-creation', donneAlefa, 'token')
        .then(({ data }) => toast.success(data?.message || 'Classe ajoutée ✅'))
        .then(() => setIsLoading(false))
        .then(() => setActiveTab('historique'))
        .catch((error) =>
          toast.error(error?.response?.data?.message || 'Erreur lors de la création ❌')
        )
        .finally(() => setIsLoading(false))
    }catch(error){
      console.log('le serveur ne repond pas')
    }

    reset()

  }


 const handleclickDelete = (id: number, nom_classe: string) => {
   setclasseToDelete({ id, nom_classe })
   openModal('confirmDelete')
 }
  

   const handleConfirmDelete = async () => {
     if (!classeToDelete) return
     setIsDeletingLoader(true)
     try {
       await deleteHistorique(classeToDelete.id)
     } finally {
       setIsDeletingLoader(false)
       setclasseToDelete(null)
       //  closModal('confirmDelete')
     }
   }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold ">Ajouter une Classe</h1>
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
            <input
              type="text"
              placeholder="Ex: CM2"
              {...register('nom_classe')}
              className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                errors.nom_classe
                  ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                  : 'border-gray-300 shadow-sm'
              }`}
            />
            {errors.nom_classe && (
              <p className="text-sm text-red-400 mt-1">{errors.nom_classe.message}</p>
            )}

            {/* ecolage  */}
            <div className="mt-4">
              <input
                type="number"
                placeholder="Frais scolaire (ex: 50000 Ar)"
                {...register('ecolage')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.ecolage
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.ecolage && (
                <p className="text-sm text-red-400 mt-1">{errors.ecolage.message}</p>
              )}
            </div>

            {/* droit  */}
            <div className="mt-4">
              <input
                type="number"
                placeholder="Droit scolaire (ex: 50000 Ar)"
                {...register('droit')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.droit
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.droit && <p className="text-sm text-red-400 mt-1">{errors.droit.message}</p>}
            </div>

            {/* Kermesse  */}
            <div className="mt-4">
              <input
                type="number"
                placeholder="Kermesse scolaire (ex: 50000 Ar)"
                {...register('kermesse')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.kermesse
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.kermesse && (
                <p className="text-sm text-red-400 mt-1">{errors.kermesse.message}</p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez une année</h2>
              {isYearsLloading ? (
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
                <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl border-gray-300 bg-white">
                  {years.map((year, index) => (
                    <div
                      key={index}
                      onClick={() => setValue('ac_id', year.annee)}
                      className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${
                        selectedYearforstyle === year.annee
                          ? 'bg-[#895256] text-white border-[#895256]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {year.annee}
                    </div>
                  ))}
                </div>
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
            {isYearsLloading ? (
              <div className="flex w-full justify-center">
                <RotatingLines
                  visible={true}
              
                  width="50"
                
                  strokeColor="#7A3B3F"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
               
                
                />
              </div>
            ) : (
              <div className="mt-4 max-h-64 overflow-auto">
                {historiques.length === 0 ? (
                  <p className="text-gray-500 text-center">Aucune classe ajoutée</p>
                ) : (
                  <ul className="space-y-3">
                    {historiques.map(({ id, nom_classe, ecolage, acs }, index) => (
                      <li
                        key={index}
                        className="bg-white shadow-sm px-5 py-3 rounded-xl flex justify-between items-center border border-gray-200 hover:shadow-md transition"
                      >
                        <div className="flex flex-col text-left">
                          <span className="text-base font-semibold text-gray-800">
                            {nom_classe}
                          </span>
                          <span className="text-sm text-gray-500">Année : {acs?.annee}</span>
                          <span className="text-sm text-[#895256] font-medium mt-1">
                            {ecolage} Ar
                          </span>
                        </div>
                        <button
                          onClick={() => handleclickDelete(id , nom_classe)}
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
          </>
        )}
      </div>

      {modal.confirmDelete && classeToDelete && (
        <ConfirmDeleteModal
          title="Supprimer la classe"
          message={`Voulez-vous vraiment supprimer la classe de ${classeToDelete.nom_classe} ?`}
          onConfirm={handleConfirmDelete}
          closemodal={() => closModal('confirmDelete')}
          isDeletingLoader={isDeletingLoader}
        />
      )}
    </div>
  )
}

export default Addniveaumodal
