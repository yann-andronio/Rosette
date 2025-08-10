import { FiEdit, FiUser, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { StudentsType } from '@renderer/types/Alltypes'

type NotemodalProps = {
  closemodal: () => void
  student: StudentsType
}

const Addnotemodal: React.FC<NotemodalProps> = ({ closemodal , student }) => {
  const ValidationSchema = yup.object({
    trimestre1: yup.string(),
    trimestre2: yup.string(),  
    trimestre3: yup.string(),
    moyenne: yup.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(ValidationSchema) })

  const onSubmit = (data: any) => {
    console.log(data)
    reset()
    closemodal()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white w-[65%] h-[550px] rounded-2xl flex shadow-2xl overflow-hidden">
        {/* DESIGN GAUCHE */}
        <div className="w-1/2 bg-[#895256] text-white flex flex-col items-center justify-center p-8">
          {student.photo ? (
            <img
              src={student.photo}
              alt="Profil"
              className="w-36 h-36 object-cover rounded-full border-4 border-white mb-6 shadow-md"
            />
          ) : (
            <div className="w-36 h-36 flex items-center justify-center rounded-full bg-[#6b4a52] border-4 border-white mb-6 shadow-lg">
              <FiUser className="text-white text-[6rem]" />
            </div>
          )}
          <h2 className="text-xl font-semibold text-center">
            {student.nom} {student.prenom}
          </h2>
          <p className="mt-1 text-sm italic opacity-90">{student.classe}</p>
          
        </div>

        {/* FORMULAIRE DROIT */}
        <div className="w-1/2 p-10 flex flex-col justify-between">
          
          <button
            onClick={closemodal}
            aria-label="Fermer"
            className="self-end text-gray-600 hover:text-red-600 transition mb-4"
            type="button"
          >
            <FiX className="text-3xl" />
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto pr-3"
            style={{ maxHeight: '460px' }}
          >
            
            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">Notes</legend>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trimestre 1</label>
                <input
                  type="text"
                  {...register('trimestre1')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.trimestre1
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Ex: 12.5"
                />
                {errors.trimestre1 && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.trimestre1.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trimestre 2</label>
                <input
                  type="text"
                  {...register('trimestre2')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.trimestre2
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Ex: 14"
                />
                {errors.trimestre2 && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.trimestre2.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Trimestre 3</label>
                <input
                  type="text"
                  {...register('trimestre3')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.trimestre3
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Ex: 13"
                />
                {errors.trimestre3 && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.trimestre3.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moyenne Génerale
                </label>
                <input
                  type="text"
                  {...register('moyenne')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.moyenne
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Ex: 13.5"
                />
                {errors.moyenne && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.moyenne.message}
                  </p>
                )}
              </div>
            </fieldset>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a4645a] to-[#7c3f42] text-white py-4 rounded-xl hover:from-[#895256] hover:to-[#623d3e] transition flex justify-center items-center gap-3 font-semibold text-lg shadow-md"
              >
                <FiEdit size={22} />
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addnotemodal
