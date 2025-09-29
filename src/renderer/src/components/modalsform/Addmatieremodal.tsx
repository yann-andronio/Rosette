import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

type OperationProps = { closemodal: () => void }

interface FormValues {
  motif: string
}

const schema = yup.object({
  motif: yup.string().required('Le motif est requis')
})


type HistoriqueItem = {
  id: number
  motif: string
  date: string
}

export default function Addmatieremodal({ closemodal }: OperationProps) {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [historiques, setHistoriques] = useState<HistoriqueItem[]>([])


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { motif: '' }
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form data alefa :', data)

    const newHistorique: HistoriqueItem = {
      id: Date.now(),
      motif: data.motif,
      date: new Date().toLocaleString()
   
    }

    console.log('Historique complet miboaka :', newHistorique)

    setHistoriques((prev) => [...prev, newHistorique])
    setActiveTab('historique')
    reset()
  }

  const removeHistorique = (id: number) => setHistoriques((prev) => prev.filter((h) => h.id !== id))

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold">Ajouter une matière</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            {['ajouter', 'historique'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab as 'ajouter' | 'historique')
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

        {/* Formulaire */}
        {activeTab === 'ajouter' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
           
              <input
                {...register('motif')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.motif
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
                placeholder="Ex: Mathématiques"
              />
              {errors.motif && (
                <p className="text-sm text-red-600 font-medium mt-1">{errors.motif.message}</p>
              )}
            </div>

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
                <FiPlus size={18} /> Ajouter
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {historiques.length === 0 ? (
              <p className="text-center text-gray-500">Aucune matière enregistrée</p>
            ) : (
              <ul className="space-y-3">
                {historiques.map(({ id, motif, date }) => (
                  <li
                    key={id}
                    className="bg-gray-100 p-4 rounded-lg flex justify-between items-start hover:bg-gray-200 transition"
                  >
                    <div>
                      <p className="font-semibold">Matière : {motif}</p>
                      <p className="text-xs text-gray-500 mb-1">Date : {date}</p>
                      {/* J'ai supprimé la liste 'ops' car elle contenait le montant */}
                    </div>
                    <button
                      onClick={() => removeHistorique(id)}
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
