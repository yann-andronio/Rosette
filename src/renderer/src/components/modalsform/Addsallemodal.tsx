import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { niveau } from '@renderer/data/Filterselectiondata'

type AddsalleModalProps = {
  closemodal: () => void
}

type FormDataalefa = {
  selectedniveau: string
  addnamesalle: string
  effectif: number
}

const Addsallemodal: React.FC<AddsalleModalProps> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [paramsList, setParamsList] = useState<
    { niveau: string; addnamesalle: string; effectif: number }[]
  >([])

  const schema = yup.object({
    selectedniveau: yup.string().required('Sélectionnez un niveau'),
    addnamesalle: yup
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

  const selectedniveauForStyle = watch('selectedniveau')

    const onSubmit = (data: FormDataalefa) => {
    //   miverifie  si efa misy  salle mitovy pour  ce niveau.
   if (!paramsList.some((c) => c.niveau === data.selectedniveau && c.addnamesalle === data.addnamesalle)) {
     setParamsList([
       ...paramsList,
       { niveau: data.selectedniveau, addnamesalle: data.addnamesalle , effectif: data.effectif },
     ])
   }
      console.log(data)
    reset()
    setActiveTab('historique')
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
                {...register('addnamesalle')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.addnamesalle
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.addnamesalle && (
                <p className="text-sm text-red-400 mt-1">{errors.addnamesalle.message}</p>
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
            <div>
              <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez un niveau</h2>
              <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl  bg-white ">
                {niveau.map((niv, index) => (
                  <div
                    key={index}
                    onClick={() => setValue('selectedniveau', niv.name)}
                    className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${
                      selectedniveauForStyle === niv.name
                        ? 'bg-[#895256] text-white border-[#895256]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {niv.name}
                  </div>
                ))}
              </div>
              {errors.selectedniveau && (
                <p className="text-sm text-red-400 mt-1">{errors.selectedniveau.message}</p>
              )}
            </div>

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
                <FiPlus size={18} />
                Ajouter
              </button>
            </div>
          </form>
        ) : (
          // Historique
          <div className="mt-4 max-h-64 overflow-auto">
            {paramsList.length === 0 ? (
              <p className="text-gray-500 text-center">Aucune salle ajoutée</p>
            ) : (
              <ul className="space-y-3">
                {paramsList.map(({ niveau, addnamesalle, effectif }, index) => (
                  <li
                    key={index}
                    className="bg-white shadow-sm px-5 py-3 rounded-xl flex justify-between items-center border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-sm text-gray-700 font-medium">
                        Salle : {addnamesalle}
                      </span>
                      <span className="text-sm text-[#895256]">Niveau : {niveau}</span>
                      <span className="text-xs text-gray-500">Effectif : {effectif} élèves</span>
                    </div>
                    <button
                      onClick={() => setParamsList(paramsList.filter((_, i) => i !== index))}
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
    </div>
  )
}

export default Addsallemodal
