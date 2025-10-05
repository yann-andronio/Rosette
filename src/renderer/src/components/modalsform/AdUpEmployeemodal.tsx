import { FiEdit, FiPlus, FiUser, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { axiosRequest } from '@renderer/config/helpers'
import { Oval, ThreeDots } from 'react-loader-spinner'
import { EmployerType } from '@renderer/types/Alltypes'
import { toast } from 'react-toastify'
const matieresDisponibles = ['Math', 'Physique', 'Chimie', 'Français', 'Anglais', 'Histoire']

type EmployeeModalProps = {
  closemodal: () => void
  mode: 'ajoutemployer' | 'modifemplyer'
  id?: number
  reload: boolean
  fresh: (boolean) => void
}

const schema = yup.object().shape({
  nom: yup.string().required('Nom requis'),
  prenom: yup.string().required('Prénom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  // Le sexe est une chaîne dans ce schéma, donc pas de transformation yup.number() nécessaire ici
  sexe: yup.string().required('Sexe requis'),
  adresse: yup.string().required('Adresse requise'),
  telephone: yup
    .string()
    .required('Téléphone requis')
    .matches(/^[0-9+\s-]+$/, 'Numéro invalide'),
  p_id: yup.number().typeError("Fonction requise").required('Fonction requise'),
  salaire_base: yup
    .number()
    .typeError('Le salaire doit être un nombre')
    .required('Salaire requis')
    .positive('Le salaire doit être positif'),
  matiere: yup.array().of(
    yup.object().shape({
      matiere: yup.string().required('Matière requise'),
      salle: yup.string().required('Salle requise')
    })
  )
})

const AdUpEmployeemodal: React.FC<EmployeeModalProps> = ({
  closemodal,
  mode,
  id,
  reload,
  fresh
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { matiere: [] }
  })

  const watchFonction = watch('p_id')
  const watchMatieresSalles = watch('matiere') || []
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<Blob | string>('')
  const [errorMatiere, setErrorMatiere] = useState<string>('')
  const [professionLoading, setProfessionLoading] = useState<boolean>(false)
  const [profession, setProfession] = useState<{ id: number; profession: string }[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [preWorker, setPreWorker] = useState<EmployerType>()
  const [historiques, setHistoriques] = useState<{ nom: string; id: number; created_at }[]>([])
  const getHistoriques = async () => {
    try {
      await axiosRequest('GET', 'domaines', null, 'token')
        .then(({ data }) => setHistoriques(data))
        .catch((error) => console.log(error))
    } catch (e) {
      console.log('Le serveur ne repond pas')
    }
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const addMatiere = () => {
    setValue('matiere', [...watchMatieresSalles, { matiere: '', salle: '' }], {
      shouldValidate: true
    })
    setErrorMatiere('')
  }

  const suprimerMatiere = (index: number) => {
    const newList = [...watchMatieresSalles]
    newList.splice(index, 1)
    setValue('matiere', newList)
    if (watchFonction == '1' && newList.length === 0)
      setErrorMatiere('Au moins une matière doit être ajoutée pour un professeur.')
  }

  const onSubmit = async (data: any) => {
    if (watchFonction == '1' && watchMatieresSalles.length === 0) {
      setErrorMatiere('Au moins une matière doit être ajoutée pour un professeur.')
      return
    }
    console.log('Données soumises :', data)
    if (mode == 'ajoutemployer') {
      const formData = new FormData()
      for (const key in data) {
        if (key != 'matiere') {
          formData.append(key, data[key])
        }
      }

      formData.append('matiere', JSON.stringify(data.matiere))
      formData.append('photo', image)
      setIsLoading(true)
      try {
        const response = await axiosRequest('POST', 'worker-creation', formData, 'token')
        toast.success(response.data.message)
        fresh(!reload) 
        closemodal()
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Erreur lors de l'ajout de l'employé.")
      } finally {
        setIsLoading(false)
      }
    } else {
      const formData = new FormData()
      for (const key in data) {
        if (key != 'matiere') {
          formData.append(key, data[key])
        }
      }

      formData.append('matiere', JSON.stringify(data.matiere))
      formData.append('photo', image)
      setIsLoading(true)
    try {
      const response = await axiosRequest('POST', `worker-update/${id}`, formData, 'token')
      toast.success(response.data.message)
      fresh(!reload)
      closemodal()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erreur lors de la modification de l'employé.")
    } finally {
      setIsLoading(false)
    }
    }
  }
  const getProfession = async () => {
    setProfessionLoading(true)
    try {
      await axiosRequest('GET', 'profession-list', null, 'token')
        .then(({ data }) => setProfession(data))
        .then(() => setProfessionLoading(false))
        .catch((error) => console.log(error?.response?.data?.error))
        .finally(() => setProfessionLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getProfession()
  }, [])
  const getWorker = async () => {
    try {
      axiosRequest('GET', `worker/${id}`, null, 'token')
        .then(({ data }) => {
          reset(data)
          setPreWorker(data)
        })
        .catch((error) => console.log(error?.response?.data?.error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }
  useEffect(() => {
    getHistoriques()
  }, [])
  useEffect(() => {
    getWorker()
  }, [mode == 'modifemplyer'])
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white w-full max-w-7xl h-[90vh] rounded-2xl flex shadow-2xl overflow-hidden">
        {/* Partie gauche */}
        <div className="w-1/3 bg-[#895256] flex flex-col items-center justify-center p-8 relative">
          <div className="flex flex-col items-center mb-10">
            <label htmlFor="photo" className="cursor-pointer">
              <input
                type="file"
                onChange={handleImageChange}
                id="photo"
                accept="image/*"
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Photo employé"
                  className="w-40 h-40 object-cover rounded-full border-4 border-white mb-10 shadow-lg"
                />
              ) : (
                <>
                  {mode == 'modifemplyer' ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/storage/uploads/${preWorker?.photo}`}
                      alt="Photo Employé"
                      className="w-40 h-40 object-cover rounded-full border-4 border-white mb-10 shadow-lg"
                    />
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center rounded-full bg-[#6b4a52] border-4 border-white mb-10 shadow-lg">
                      <FiUser className="text-white text-[7rem]" />
                    </div>
                  )}
                </>
              )}
            </label>
            <span className="text-sm text-white">Cliquez pour choisir une photo</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3 text-center tracking-wide">
            Bienvenue dans le module employé
          </h2>
          <p className="text-base text-white text-center mb-10 px-6 leading-relaxed">
            Remplissez les informations à droite pour{' '}
            {mode === 'ajoutemployer' ? 'ajouter un nouvel employé' : 'modifier cet employé'}.
          </p>
        </div>

        {/* Partie droite */}
        <div className="w-2/3 p-10 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#895256] tracking-tight">
              {mode === 'ajoutemployer' ? 'Ajouter Employé' : 'Modifier Employé'}
            </h2>
            <button
              onClick={closemodal}
              aria-label="Fermer"
              className="text-gray-600 hover:text-red-600 transition"
            >
              <FiX className="text-3xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto pr-3 flex-grow">
            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Informations générales
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                {[
                  'nom',
                  'prenom',
                  'email',
                  'sexe',
                  'adresse',
                  'telephone',
                  'p_id',
                  'salaire_base'
                ].map((field) => (
                  <div className="mb-5" key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field == 'p_id' ? (
                        'Fonction *'
                      ) : (
                        <>{field.charAt(0).toUpperCase() + field.slice(1)} *</>
                      )}
                    </label>
                    {field === 'sexe' || field === 'p_id' ? (
                      <select
                        {...register(field as any)}
                        className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                          errors[field as keyof typeof errors]
                            ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                            : 'border-gray-300 shadow-sm'
                        }`}
                      >
                        <option value="">Sélectionnez</option>
                        {field === 'sexe' ? (
                          <>
                            <option value={1}>Homme</option>
                            <option value={0}>Femme</option>
                          </>
                        ) : (
                          <>
                            {professionLoading ? (
                              <Oval
                                visible={true}
                                height="25"
                                width="25"
                                color="#895256"
                                strokeWidth="5"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            ) : (
                              profession.map((f, index) => (
                                <option key={f.id} value={f.id}>
                                  {f.profession}
                                </option>
                              ))
                            )}
                          </>
                        )}
                      </select>
                    ) : (
                      <input
                        type={field === 'salaire_base' ? 'number' : 'text'}
                        {...register(field as any)}
                        placeholder={`Entrez le ${field}`}
                        className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                          errors[field as keyof typeof errors]
                            ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                            : 'border-gray-300 shadow-sm'
                        }`}
                      />
                    )}
                    {errors[field as keyof typeof errors] && (
                      <p className="text-red-500 text-xs mt-1 italic">
                        {errors[field as keyof typeof errors]?.message?.toString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Matières & salles uniquement raha professeur nle fonction */}
            <AnimatePresence>
              {watchFonction == '1' && (
                <motion.fieldset
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm"
                >
                  <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                    Matières & Salles
                  </legend>

                  {watchMatieresSalles.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-wrap items-start gap-3 mb-4"
                    >
                      {/* Matière */}
                      <div className="flex-1 min-w-[150px] relative">
                        <select
                          {...register(`matiere.${index}.matiere` as const)}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#895256] focus:outline-none ${
                            errors.matiere?.[index]?.matiere
                              ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                              : 'border-gray-300'
                          }`}
                        >
                          <option value="">Sélectionnez matière</option>
                          {historiques.map((m) => (
                            <option key={m.id} value={m.nom}>
                              {m.nom}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Salle */}
                      <div className="flex-1 min-w-[150px] relative">
                        <input
                          type="text"
                          {...register(`matiere.${index}.salle` as const)}
                          placeholder="Entrez le nom de la sall"
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#895256] focus:outline-none ${
                            errors.matiere?.[index]?.salle
                              ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                              : 'border-gray-300'
                          }`}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => suprimerMatiere(index)}
                        className="text-gray-500 hover:text-red-700 mt-2"
                      >
                        <FiX size={20} />
                      </button>
                    </motion.div>
                  ))}

                  <button
                    type="button"
                    onClick={addMatiere}
                    className="mt-2 px-4 py-2 bg-[#895256] text-white rounded-xl hover:bg-[#623d3e] transition"
                  >
                    Ajouter matière
                  </button>

                  {errorMatiere && (
                    <p className="text-red-500 text-xs mt-1 italic">{errorMatiere}</p>
                  )}
                </motion.fieldset>
              )}
            </AnimatePresence>

            <div className="sticky  bottom-0 bg-white pt-4 pb-0  border-t border-gray-100">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a4645a] to-[#7c3f42] text-white py-4 rounded-xl hover:from-[#895256] hover:to-[#623d3e] transition flex justify-center items-center gap-3 font-semibold text-lg shadow-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ThreeDots
                    visible={true}
                    height="23"
                    width="100"
                    color="pink"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    {' '}
                    {mode === 'ajoutemployer' ? <FiPlus size={22} /> : <FiEdit size={22} />}
                    {mode === 'ajoutemployer' ? 'Ajouter' : 'Modifier'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdUpEmployeemodal
