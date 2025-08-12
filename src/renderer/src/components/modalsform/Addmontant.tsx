import { FiPlus, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../images/test.png'

type montantmodalProps = {
  closemodal: () => void
}

const Addmontant: React.FC<montantmodalProps> = ({ closemodal }) => {
  const ValidationSchema = yup.object({
    classe: yup.string().required('Nom requis'),
    montant: yup.string().required('Prénom requis'),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[90%] p-6 animate-fade-in"
      >
        <div className="flex items-center justify-center    mb-12">
          <h2 className=" text-2xl font-bold text-gray-800 flex items-center gap-2">
            Ajoutez du montant{' '}
          </h2>
          <button
            onClick={closemodal}
            className="text-white absolute right-25 rounded-lg p-1 bg-red-400 hover:bg-red-500 hover:scale-105  transition"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="bigboxform flex gap-10 items-center ">
          {/* section111 */}
          <div className="flex-1 ">
            <div className="champ1 flex flex-col gap-4 ">
              <div className="sary ">
                <div className=" flex items-center justify-center bg-white-500">
                  <img className="w-[75%]" src={logo} alt="Logo" />
                </div>
              </div>
            </div>
          </div>
          {/* section222222222222222222222222222222222222222 */}
          <div className="flex-1">
            <div className="champ2 flex flex-col gap-4 ">
              <div className="Nom">
                <label className="block font-medium text-gray-700 mb-1">Classe</label>
                <input
                  type="text"
                  placeholder="rakoto"
                  {...register('classe')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.classe ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.classe && (
                  <p className="text-sm text-red-400 mt-1">{errors.classe.message}</p>
                )}
              </div>

              <div className="prenom">
                <label className="block font-medium text-gray-700 mb-1">montant</label>
                <input
                  type="text"
                  placeholder="kely"
                  {...register('montant')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.montant ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.montant && (
                  <p className="text-sm text-red-400 mt-1">{errors.montant.message}</p>
                )}
              </div>

             
             
            </div>
          </div>
          {/* section33333333333333333333333333333333333333 */}
          <div className="flex-1">
            <div className="champ3 flex flex-col gap-4 ">
              <div className="T1">
                <label className="block font-medium text-gray-700 mb-1">Trimestre 1</label>
                <input
                  type="number"
                  placeholder=""
                  {...register('trimestre1')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.trimestre1 ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.trimestre1 && (
                  <p className="text-sm text-red-400 mt-1">{errors.trimestre1.message}</p>
                )}
              </div>

              <div className="T2">
                <label className="block font-medium text-gray-700 mb-1">Trimestre 2</label>
                <input
                  type="number"
                  placeholder=""
                  {...register('trimestre2')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.trimestre2 ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.trimestre2 && (
                  <p className="text-sm text-red-400 mt-1">{errors.trimestre2.message}</p>
                )}
              </div>

            
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <p
            onClick={closemodal}
            className=" cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white hover:transition-all transition-all font-medium"
          >
            Annuler
          </p>

          <button
            type="submit"
            className={`px-5 py-2 rounded-lg bg-[#895256] text-[#ffff] hover:bg-[#733935] transition font-semibold flex items-center gap-2`}
          >
            <FiPlus size={18} />
            Ajouter
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addmontant
