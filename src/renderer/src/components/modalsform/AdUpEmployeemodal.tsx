import { FiEdit, FiPlus, FiUser, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const fonctionsDisponibles = ['Professeur', 'Surveillant', 'Gardien', 'Administratif']
const matieresDisponibles = ['Math', 'Physique', 'Chimie', 'Français', 'Anglais', 'Histoire']

type EmployeeModalProps = {
  closemodal: () => void
  mode: 'ajoutemployer' | 'modifemplyer'
}

const schema = yup.object().shape({
  nom: yup.string().required('Nom requis'),
  prenom: yup.string().required('Prénom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  sexe: yup.string().required('Sexe requis'),
  adresse: yup.string().required('Adresse requise'),
  telephone: yup
    .string()
    .required('Téléphone requis')
    .matches(/^[0-9+\s-]+$/, 'Numéro invalide'),
  fonction: yup.string().required('Fonction requise'),
  salaire: yup
    .number()
    .typeError('Le salaire doit être un nombre')
    .required('Salaire requis')
    .positive('Le salaire doit être positif'),
  matieresSalles: yup.array().of(
    yup.object().shape({
      matiere: yup.string().required('Matière requise'),
      salle: yup.string().required('Salle requise')
    })
  )
})

const AdUpEmployeemodal: React.FC<EmployeeModalProps> = ({ closemodal, mode }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { matieresSalles: [] }
  })

  const watchFonction = watch('fonction')
  const watchMatieresSalles = watch('matieresSalles') || []
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<Blob | string>('')
  const [errorMatiere, setErrorMatiere] = useState<string>('')

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
    setValue('matieresSalles', [...watchMatieresSalles, { matiere: '', salle: '' }], {
      shouldValidate: true
    })
    setErrorMatiere('')
  }

  const suprimerMatiere = (index: number) => {
    const newList = [...watchMatieresSalles]
    newList.splice(index, 1)
    setValue('matieresSalles', newList)
    if (watchFonction === 'Professeur' && newList.length === 0)
      setErrorMatiere('Au moins une matière doit être ajoutée pour un professeur.')
  }

  const onSubmit = (data: any) => {
    if (watchFonction === 'Professeur' && watchMatieresSalles.length === 0) {
      setErrorMatiere('Au moins une matière doit être ajoutée pour un professeur.')
      return
    }
    console.log('Données soumises :', data)
    closemodal()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white w-[80%] h-[650px] rounded-2xl flex shadow-2xl overflow-hidden">
        {/* Partie gauche */}
        <div className="w-1/2 bg-[#895256] flex flex-col items-center justify-center p-8 relative">
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
                <div className="w-40 h-40 flex items-center justify-center rounded-full bg-[#6b4a52] border-4 border-white mb-10 shadow-lg">
                  <FiUser className="text-white text-[7rem]" />
                </div>
              )}
            </label>
            <span className="text-sm text-white">Cliquez pour choisir une photo</span>
          </div>
        </div>

        {/* Partie droite */}
        <div className="w-1/2 p-10 flex flex-col justify-between">
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto pr-3"
            style={{ maxHeight: '540px' }}
          >
            {/* Informations générales */}
            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Informations générales
              </legend>

              {[
                'nom',
                'prenom',
                'email',
                'sexe',
                'adresse',
                'telephone',
                'fonction',
                'salaire'
              ].map((field) => (
                <div className="mb-5" key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)} *
                  </label>
                  {field === 'sexe' || field === 'fonction' ? (
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
                          <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </>
                      ) : (
                        fonctionsDisponibles.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))
                      )}
                    </select>
                  ) : (
                    <input
                      type={field === 'salaire' ? 'number' : 'text'}
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
            </fieldset>

            {/* Matières & salles uniquement raha professeur nle fonction */}
            <AnimatePresence>
              {watchFonction === 'Professeur' && (
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
                          {...register(`matieresSalles.${index}.matiere` as const)}
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#895256] focus:outline-none ${
                            errors.matieresSalles?.[index]?.matiere
                              ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                              : 'border-gray-300'
                          }`}
                        >
                          <option value="">Sélectionnez matière</option>
                          {matieresDisponibles.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Salle */}
                      <div className="flex-1 min-w-[150px] relative">
                        <input
                          type="text"
                          {...register(`matieresSalles.${index}.salle` as const)}
                          placeholder="Entrez le nom de la sall"
                          className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#895256] focus:outline-none ${
                            errors.matieresSalles?.[index]?.salle
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#a4645a] to-[#7c3f42] text-white py-4 rounded-xl hover:from-[#895256] hover:to-[#623d3e] transition flex justify-center items-center gap-3 font-semibold text-lg shadow-md"
            >
              {mode === 'ajoutemployer' ? <FiPlus size={22} /> : <FiEdit size={22} />}
              {mode === 'ajoutemployer' ? 'Ajouter' : 'Modifier'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdUpEmployeemodal
