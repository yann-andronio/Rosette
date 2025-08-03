import { FiEdit, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type NotemodalProps = {
  closemodal: () => void
}

const Addnotemodal: React.FC<NotemodalProps> = ({ closemodal }) => {
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
    reset,
  } = useForm({ resolver: yupResolver(ValidationSchema) })

  const onSubmit = (data: any) => {
    console.log(data)
    reset()
    closemodal()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white w-[75%] h-[550px] rounded-2xl flex shadow-2xl overflow-hidden">
        {/* DESIGN GAUCHE */}
        <div className="w-1/2 bg-[#895256] flex flex-col items-center justify-center p-8 relative">
          <h2 className="text-2xl font-extrabold text-white mb-3 text-center tracking-wide">
            Module Notes Étudiant
          </h2>
          <p className="text-base text-white text-center mb-10 px-6 leading-relaxed">
            Remplissez les informations ci-contre pour ajouter une note.
          </p>
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
            {/* IG */}
            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Informations principales
              </legend>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <input
                  type="text"
                  {...register('nom')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.nom
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Entrez le nom"
                />
                {errors.nom && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.nom.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <input
                  type="text"
                  {...register('prenom')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.prenom
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Entrez le prénom"
                />
                {errors.prenom && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.prenom.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Classe *</label>
                <input
                  type="text"
                  {...register('classe')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.classe
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Ex: CM2"
                />
                {errors.classe && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.classe.message}
                  </p>
                )}
              </div>
            </fieldset>

            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Notes et coefficients
              </legend>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total coefficient
                </label>
                <input
                  type="text"
                  {...register('totalcoefficient')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.totalcoefficient
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Ex: 10"
                />
                {errors.totalcoefficient && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.totalcoefficient.message}
                  </p>
                )}
              </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-2">Moyenne Génerale</label>
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
