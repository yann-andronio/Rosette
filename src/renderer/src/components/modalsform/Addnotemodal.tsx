import { FiPlus, FiX, FiUser, FiBook, FiBarChart2 } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../images/test.png'

type notemodalProps = {
  closemodal: () => void
}

const Addnotemodal: React.FC<notemodalProps> = ({ closemodal }) => {
  const ValidationSchema = yup.object({
    nom: yup.string().required('Nom requis'),
    prenom: yup.string().required('Prénom requis'),
    classe: yup.string().required('Classe requise'),
    totalcoefficient: yup.string(),
    trimestre1: yup.string(),
    trimestre2: yup.string(),
    trimestre3: yup.string(),
    moyenne: yup.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(ValidationSchema) })

  const onSubmit = (data: any) => {
    console.log(data)
    reset()
    closemodal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 animate-fade-in relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
            <FiBook className="text-[#895256]" size={28} />
            Ajouter une note
          </h2>
          <button
            onClick={closemodal}
            type="button"
            className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Logo section */}
          <div className="flex-1 flex justify-center items-center">
            <img src={logo} className="w-[80%] max-w-[200px]" alt="Logo" />
          </div>

          {/* Input fields */}
          <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: 'nom', label: 'Nom', icon: <FiUser />, placeholder: 'Rakoto' },
              { name: 'prenom', label: 'Prénom', icon: <FiUser />, placeholder: 'Kely' },
              {
                name: 'classe',
                label: 'Classe',
                isSelect: true,
                options: ['CM2', 'CM1']
              },
              {
                name: 'totalcoefficient',
                label: 'Total Coefficient',
                placeholder: 'Ex : 20'
              },
              { name: 'trimestre1', label: 'Trimestre 1' },
              { name: 'trimestre2', label: 'Trimestre 2' },
              { name: 'trimestre3', label: 'Trimestre 3' },
              { name: 'moyenne', label: 'Moyenne Générale' }
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-gray-700 font-medium mb-1">{field.label}</label>
                {field.isSelect ? (
                  <select
                    {...register(field.name as any)}
                    className={`w-full px-4 py-2.5 border bg-[#F9F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#895256] ${
                      errors[field.name as keyof typeof errors]
                        ? 'border-red-400'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Sélectionner</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt.toLowerCase()}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={
                      field.name.includes('trimestre') ||
                      field.name === 'moyenne' ||
                      field.name === 'totalcoefficient'
                        ? 'number'
                        : 'text'
                    }
                    placeholder={field.placeholder || ''}
                    {...register(field.name as any)}
                    className={`w-full px-4 py-2.5 border bg-[#F9F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400 ${
                      errors[field.name as keyof typeof errors]
                        ? 'border-red-400'
                        : 'border-gray-300'
                    }`}
                  />
                )}
                {errors[field.name as keyof typeof errors] && (
                  <p className="text-sm text-red-400 mt-1">
                    {(errors[field.name as keyof typeof errors] as any)?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            type="button"
            onClick={closemodal}
            className="px-5 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-red-100 transition-all"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-[#895256] text-white rounded-lg hover:bg-[#733935] transition-all"
          >
            <FiPlus size={18} />
            Ajouter
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addnotemodal
