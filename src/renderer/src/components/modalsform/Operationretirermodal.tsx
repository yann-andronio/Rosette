import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

type OperationProps = { closemodal: () => void }

interface FormValues {
  motif: string
  solde_ecolage: number
  solde_depot: number
  solde_kermess: number
}


const schema = yup.object({
  motif: yup.string().required('Le motif est requis'),
  solde_ecolage: yup
    .number()
    .transform((v) => (isNaN(v) ? 0 : v))
    .required()
    .default(0)
    .min(0, "Le montant de l'écolage doit être >= 0"),
  solde_depot: yup
    .number()
    .transform((v) => (isNaN(v) ? 0 : v))
    .required()
    .default(0)
    .min(0, 'Le montant du dépôt doit être >= 0'),
  solde_kermess: yup
    .number()
    .transform((v) => (isNaN(v) ? 0 : v))
    .required()
    .default(0)
    .min(0, 'Le montant de la kermess doit être >= 0')
})

export default function OperationModal({ closemodal }: OperationProps) {
  const [activeTab, setActiveTab] = useState<'retirer' | 'historique'>('retirer')
  const [historiques, setHistoriques] = useState<{ id: number; motif: string; ops: { type: string; montant: number }[]; date: string }[]>([])
  const [errorkely, seterrorkely] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { motif: '', solde_ecolage: 0, solde_depot: 0, solde_kermess: 0 }
  })

    const onSubmit = (data: FormValues) => {
    //   Ops = operation laolo aii
    const newOps = [
      { type: "Solde d'écolage", montant: data.solde_ecolage },
      { type: 'Solde de dépôt', montant: data.solde_depot },
      { type: 'Solde de kermess', montant: data.solde_kermess }
    ].filter((op) => op.montant > 0)

    if (newOps.length === 0) {
      seterrorkely('Veuillez saisir au moins un montant supérieur à 0')
      return
    }
    seterrorkely(null)

    setHistoriques((prev) => [
      ...prev,
      { id: Date.now(), motif: data.motif, ops: newOps, date: new Date().toLocaleString() }
    ])
    setActiveTab('historique')
    reset()
  }

  const removeHistorique = (id: number) => setHistoriques((prev) => prev.filter((h) => h.id !== id))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            
            {['retirer', 'historique'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab as 'retirer' | 'historique')
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

        {/* Formulairess */}
        {activeTab === 'retirer' ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
            <div>
              <label className="font-semibold">Motif</label>
              <input
                {...register('motif')}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors.motif
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
                placeholder="Ex: Achat fournitures"
              />
              {errors.motif && (
                <p className="text-sm text-red-600 font-medium mt-1">{errors.motif.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-medium">Solde d'écolage</label>
                <input
                  type="number"
                  {...register('solde_ecolage')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.solde_ecolage
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Montant"
                />
                {errors.solde_ecolage && (
                  <p className="text-sm text-red-600 font-medium mt-1">
                    {errors.solde_ecolage.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-medium">Solde de dépôt</label>
                <input
                  type="number"
                  {...register('solde_depot')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.solde_depot
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Montant"
                />
                {errors.solde_depot && (
                  <p className="text-sm text-red-600 font-medium mt-1">
                    {errors.solde_depot.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-medium">Solde de kermess</label>
                <input
                  type="number"
                  {...register('solde_kermess')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.solde_kermess
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Montant"
                />
                {errors.solde_kermess && (
                  <p className="text-sm text-red-600 font-medium mt-1">
                    {errors.solde_kermess.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message d'erreurkely raha tsisy vola > 0 @ champs */}
            {errorkely && (
              <p className="text-red-700 font-semibold text-center text-base mt-2">{errorkely}</p>
            )}

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
                <FiPlus size={18} /> retirer
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {historiques.length === 0 ? (
              <p className="text-center text-gray-500">Aucune opération enregistrée</p>
            ) : (
              <ul className="space-y-3">
                {historiques.map(({ id, motif, ops, date }) => (
                  <li
                    key={id}
                    className="bg-gray-100 p-4 rounded-lg flex justify-between items-start hover:bg-gray-200 transition"
                  >
                    <div>
                      <p className="font-semibold">Motif : {motif}</p>
                      <p className="text-xs text-gray-500 mb-1">Date : {date}</p>
                      <ul className="ml-4 text-sm text-gray-700 list-disc">
                        {ops.map((itemops, index) => (
                          <li key={index}>
                            {itemops.type} : {itemops.montant} Ar
                          </li>
                        ))}
                      </ul>
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
