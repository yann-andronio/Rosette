import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

type ClassModalProps = {
  closemodal: () => void
}

const Addclassemodal: React.FC<ClassModalProps> = ({ closemodal }) => {
  const [activeTab, setActiveTab] = useState<'ajouter' | 'historique'>('ajouter')
  const [classes, setClasses] = useState<string[]>([])

  const ValidationSchema = yup.object({
    classadd: yup.string().required('Vous devez saisir un nom de classe')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(ValidationSchema) })

  const onSubmit = (data: any) => {
    if (!classes.includes(data.classadd.trim())) {
      setClasses([...classes, data.classadd.trim()])
    }
    reset()
    setActiveTab('historique')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('ajouter')}
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
              <ul className="space-y-2">
                {classes.map((classe, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition flex justify-between items-center"
                  >
                    <span>Classe : {classe}</span>
                    <button
                      onClick={() => {
                        setClasses(classes.filter((_, i) => i !== index))
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                      aria-label={`Supprimer la classe ${classe}`}
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
