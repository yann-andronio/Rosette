import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { years } from '@renderer/data/Filterselectiondata'

type ChosseCtausMoyenModalProps = {
  closemodal: () => void
}

type FormDataAlefa = {
  selectedyear: string
  moyenneAdmission: number
}

const Choosestatusmoyennemodalparams: React.FC<ChosseCtausMoyenModalProps> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [paramsList, setParamsList] = useState<{ year: string; moyenneAdmission: number }[]>([])

  const schema = yup.object({
    selectedyear: yup
      .string()
      .required('Sélectionnez une année'),
    moyenneAdmission: yup
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

  const selectedYearforstyle = watch('selectedyear')

  const onSubmit = (data: FormDataAlefa) => {
    if (!paramsList.some((c) => c.year === data.selectedyear)) {
      setParamsList([
        ...paramsList,
        { year: data.selectedyear, moyenneAdmission: data.moyenneAdmission }
      ])
    }

    console.log('Paramètres :', data)
    reset()
    setActiveTab('historique')
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
                {...register('moyenneAdmission')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.moyenneAdmission
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors.moyenneAdmission && (
                <p className="text-sm text-red-400 mt-1">{errors.moyenneAdmission.message}</p>
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
          //   historique ajouté
          <div className="mt-4 max-h-64 overflow-auto">
            {paramsList.length === 0 ? (
              <p className="text-gray-500 text-center">Aucun paramètre ajouté</p>
            ) : (
              <ul className="space-y-3">
                {paramsList.map(({ year, moyenneAdmission }, index) => (
                  <li
                    key={index}
                    className="bg-white shadow-sm px-5 py-3 rounded-xl flex justify-between items-center border border-gray-200 hover:shadow-md transition"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-sm text-gray-500">Année : {year}</span>
                      <span className="text-sm text-[#895256] font-medium mt-1">
                        Moyenne : {moyenneAdmission}
                      </span>
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

export default Choosestatusmoyennemodalparams
