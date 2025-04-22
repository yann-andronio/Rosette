import { FiPlus, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../images/test.png'

type SearchBarProps = {
  closemodal: () => void
}

const Addnotemodal: React.FC<SearchBarProps> = ({ closemodal }) => {
  const ValidationSchema = yup.object({
    nom: yup.string().required('Nom requis'),
    prenom: yup.string().required('Prénom requis'),
    classe: yup.string().required('classe requise'),
    trimestre1: yup.string().required('trimestre1 requis'),
    trimestre2: yup.string().required('Date de naissance requise'),
    trimestre3: yup.string().required('Lieu de naissance requis'),
    totalcoefficient: yup.string(),
    moyenne: yup.string(),
    mention: yup.string(),
   
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
          <h2 className=" text-2xl font-bold text-gray-800 flex items-center gap-2">Notes</h2>
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
                  <img className="w-[40%]" src={logo} alt="Logo" />
                </div>
              </div>
            </div>
          </div>
          {/* section222222222222222222222222222222222222222 */}
          <div className="flex-1">
            <div className="champ2 flex flex-col gap-4 ">
              <div className="classe">
                <label className="block font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  placeholder="rakoto"
                  {...register('nom')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.nom ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.nom && <p className="text-sm text-red-400 mt-1">{errors.nom.message}</p>}
              </div>

              <div className="classe">
                <label className="block font-medium text-gray-700 mb-1">prenom</label>
                <input
                  type="text"
                  placeholder="kely"
                  {...register('prenom')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.prenom ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.prenom && (
                  <p className="text-sm text-red-400 mt-1">{errors.prenom.message}</p>
                )}
              </div>

              <div className="trimestre1">
                <label className="block font-medium text-gray-700 mb-1">classe</label>
                <select
                  className={` bg-[#F1F1F1]  text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#7A3B3F] transition-all duration-300 outline-none ${errors.trimestre1 ? 'border-red-400' : 'border-gray-300'}`}
                  {...register('classe')}
                >
                  <option value="">Sélectionner un classe</option>
                  <option value="directeur">CM2</option>
                  <option value="secretaire">CM1</option>
                </select>
                {errors.classe && (
                  <p className="text-sm text-red-400 mt-1">{errors.classe.message}</p>
                )}
              </div>

              <div className="totalcoefficient">
                <label className="block font-medium text-gray-700 mb-1">total coefficient</label>
                <input
                  type="text"
                  placeholder="Tana"
                  {...register('trimestre3')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.totalcoefficient ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.totalcoefficient && (
                  <p className="text-sm text-red-400 mt-1">{errors.totalcoefficient.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* section33333333333333333333333333333333333333 */}
          <div className="flex-1">
            <div className="champ3 flex flex-col gap-4 ">
              <div className="totalcoefficient">
                <label className="block font-medium text-gray-700 mb-1">total coefficient</label>
                <input
                  type="text"
                  placeholder="Tana"
                  {...register('trimestre3')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.totalcoefficient ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.totalcoefficient && (
                  <p className="text-sm text-red-400 mt-1">{errors.totalcoefficient.message}</p>
                )}
              </div>

              <div className="totalcoefficient">
                <label className="block font-medium text-gray-700 mb-1">total coefficient</label>
                <input
                  type="text"
                  placeholder="Tana"
                  {...register('trimestre3')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.totalcoefficient ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.totalcoefficient && (
                  <p className="text-sm text-red-400 mt-1">{errors.totalcoefficient.message}</p>
                )}
              </div>

              <div className="classe">
                <label className="block font-medium text-gray-700 mb-1">classe</label>
                <input
                  type="text"
                  placeholder="ambohipo"
                  {...register('classe')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.classe ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.classe && (
                  <p className="text-sm text-red-400 mt-1">{errors.classe.message}</p>
                )}
              </div>

              <div className="moyenneandtotalcoefficient flex gap-3">
                <div className="moyenne">
                  <label className="block font-medium text-gray-700 mb-1">nom du mere</label>
                  <input
                    type="text"
                    placeholder="rasoa"
                    {...register('moyenne')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.moyenne ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.moyenne && (
                    <p className="text-sm text-red-400 mt-1">{errors.moyenne.message}</p>
                  )}
                </div>

                <div className="prenom">
                  <label className="block font-medium text-gray-700 mb-1">prenom du mere</label>
                  <input
                    type="text"
                    placeholder="be"
                    {...register('mention')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.mention ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.mention && (
                    <p className="text-sm text-red-400 mt-1">{errors.mention.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <p
            onClick={closemodal}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white hover:transition-all transition-all font-medium"
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

export default Addnotemodal
