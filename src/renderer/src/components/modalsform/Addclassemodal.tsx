import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { years } from '@renderer/data/Filterselectiondata'

type ClassModalProps = {
  closemodal: () => void
}

type FormDataAlefa = {
  classadd: string
  selectedyear: string
  ecolage: number
}

const Addclassemodal: React.FC<ClassModalProps> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [classes, setClasses] = useState<{ classadd: string; year: string; ecolageeee: number }[]>([])

  const schema = yup.object({
    classadd: yup.string().required('Vous devez saisir un nom de classe'),
    selectedyear: yup.string().required('Sélectionnez une année'),
    ecolage: yup
      .number()
      .typeError('Le montant doit être un nombre')
      .required('Le montant est requis')
      .min(0, 'Le montant ne peut pas être négatif')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormDataAlefa>({ resolver: yupResolver(schema) })

  const selectedYearforstyle = watch('selectedyear')

  const onSubmit = (data: FormDataAlefa) => {
    const supspaceclasse = data.classadd.trim()

    if (!classes.some((c) => c.classadd === supspaceclasse && c.year === data.selectedyear)) {
      setClasses([
        ...classes,
        { classadd: supspaceclasse, year: data.selectedyear, ecolageeee: data.ecolage }
      ])
    }

    const donneAlefa = {
      classadd: data.classadd,
      year: data.selectedyear,
      ecolage: data.ecolage
    }

    console.log(' Données  :', donneAlefa)

    reset()
    setActiveTab('historique')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
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
              {...register('classadd')}
              className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                errors.classadd
                  ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                  : 'border-gray-300 shadow-sm'
              }`}
            />
            {errors.classadd && (
              <p className="text-sm text-red-400 mt-1">{errors.classadd.message}</p>
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

            <div className="mt-6">
              <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez une année</h2>
              <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl border-gray-300 bg-white">
                {years.map((year, index) => (
                  <div
                    key={index}
                    onClick={() => setValue('selectedyear', year.ans)}
                    className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${
                      selectedYearforstyle === year.ans
                        ? 'bg-[#895256] text-white border-[#895256]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {year.ans}
                  </div>
                ))}
              </div>
              {errors.selectedyear && (
                <p className="text-sm text-red-400 mt-1">{errors.selectedyear.message}</p>
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
                <FiPlus size={18} />
                Ajouter
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 max-h-64 overflow-auto">
            {classes.length === 0 ? (
              <p className="text-gray-500 text-center">Aucune classe ajoutée</p>
            ) : (
              <ul className="space-y-3">
                {classes.map(({ classadd, year, ecolageeee }, index) => (
                  <li
                    key={index}
                    className="bg-white shadow-sm px-5 py-3 rounded-xl flex justify-between items-center border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-base font-semibold text-gray-800">{classadd}</span>
                      <span className="text-sm text-gray-500">Année : {year}</span>
                      <span className="text-sm text-[#895256] font-medium mt-1">
                        {ecolageeee.toLocaleString()} Ar
                      </span>
                    </div>
                    <button
                      onClick={() => setClasses(classes.filter((_, i) => i !== index))}
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

export default Addclassemodal
