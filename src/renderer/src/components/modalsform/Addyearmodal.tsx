import { FiPlus, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type YearProps = {
  closemodal: () => void
}

const Addyearmodal: React.FC<YearProps> = ({ closemodal }) => {

 const ValidationSchema = yup.object({
   yearadd: yup.string().min(4, 'Au moins 4 caractères').required('vous devez saisir une anné')
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Ajouter une année
          </h2>
          <button
            onClick={closemodal}
            className="text-white rounded-lg p-1 bg-red-400 hover:bg-red-500 hover:scale-105  transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Ex: 2025"
          {...register('yearadd')}
          className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
            errors.yearadd ? 'border-red-400' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
        />
        {errors.yearadd && <p className="text-sm text-red-400 mt-1">{errors.yearadd.message}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closemodal}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white hover:transition-all transition-all font-medium"
          >
            Annuler
          </button>
          <button className="px-5 py-2 rounded-lg bg-[#895256] text-[#ffff] hover:bg-[#733935] transition font-semibold flex items-center gap-2">
            <FiPlus size={18} />
            Ajouter
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addyearmodal
