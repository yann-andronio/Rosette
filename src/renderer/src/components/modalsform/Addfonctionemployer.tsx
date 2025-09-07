import { FiPlus, FiX, FiTrash2 } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

type AddFunctionProps = {
  closemodal: () => void
}

type FormData = {
  fonction: string
}

const Addfonctionemployer: React.FC<AddFunctionProps> = ({ closemodal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [historiques, setHistoriques] = useState<{ fonction: string }[]>([])


  const schema = yup.object({
    fonction: yup.string().required('Vous devez saisir une fonction')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    setHistoriques((prev) => [...prev, { fonction: data.fonction }])
    reset()
    setActiveTab('historique')
  }

  const removeFunction = (index: number) => {
    setHistoriques((prev) => prev.filter((_, i) => i !== index))
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
              {...register('fonction')}
              className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                errors.fonction
                  ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                  : 'border-gray-300 shadow-sm'
              }`}
            />
            {errors.fonction && <p className="text-sm text-red-400">{errors.fonction.message}</p>}

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
                  <ThreeDots visible={true} height="20" width="100" color="pink" radius="9" />
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
                {historiques.map((item, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-md flex justify-between items-center hover:bg-gray-200 transition"
                  >
                    <span className="font-semibold">{item.fonction}</span>
                    <button
                      aria-label={`Supprimer la fonction ${item.fonction}`}
                      onClick={() => removeFunction(index)}
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

export default Addfonctionemployer
