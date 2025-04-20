import { FiPlus, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../images/logo.jpg'

type SearchBarProps = {
  closemodal: () => void
}

const AdUpinfostudents: React.FC<SearchBarProps> = ({ closemodal }) => {
  const ValidationSchema = yup.object({
      classadd: yup.string().required('vous devez saisir une nom de classe'),
    nom: yup.string().required('Nom requis'),
    prenom: yup.string().required('Prénom requis'),
    adresse: yup.string().required('Adresse requise'),
    sexe: yup.string().required('Sexe requis'),
    date_naissance: yup.string().required('Date de naissance requise'),
    lieu_naissance: yup.string().required('Lieu de naissance requis'),
    nom_pere: yup.string(),
    prenom_pere: yup.string(),
    nom_mere: yup.string(),
    prenom_mere: yup.string(),
    tel_pere: yup.string(),
    tel_mere: yup.string(),
    nom_tuteur: yup.string(),
    prenom_tuteur: yup.string(),
    tel_tuteur: yup.string(),
    matricule: yup.string(),
    ecole_prec: yup.string()
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Information de l'eleve
          </h2>
          <button
            onClick={closemodal}
            className="text-white rounded-lg p-1 bg-red-400 hover:bg-red-500 hover:scale-105  transition"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="bigboxform flex gap-4">

          {/* section111 */}
          <div className="flex-1 ">
            <div className="champ1 flex flex-col gap-4 ">
              <div className="sary">
                <div className="w-2/4 flex items-center justify-center bg-red-500">
                  <img className="w-3/4" src={logo} alt="Logo" />
                </div>
              </div>
              <div className="nomandprenom flex gap-3">
                <div className="nom">
                  <label className="block font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    placeholder="rakoto"
                    {...register('nom')}
                    className={`w-full px-4 py-2.5 border border-[#895256] ${
                      errors.nom ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.nom && <p className="text-sm text-red-400 mt-1">{errors.nom.message}</p>}
                </div>

                <div className="prenom">
                  <label className="block font-medium text-gray-700 mb-1">prenom</label>
                  <input
                    type="text"
                    placeholder="kely"
                    {...register('prenom')}
                    className={`w-full px-4 py-2.5 border border-[#895256] ${
                      errors.prenom ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.prenom && (
                    <p className="text-sm text-red-400 mt-1">{errors.prenom.message}</p>
                  )}
                </div>
              </div>
              <div className="adresse">
                <label className="block font-medium text-gray-700 mb-1">adresse</label>
                <input
                  type="text"
                  placeholder="ambohipo"
                  {...register('adresse')}
                  className={`w-full px-4 py-2.5 border border-[#895256] ${
                    errors.adresse ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.adresse && (
                  <p className="text-sm text-red-400 mt-1">{errors.adresse.message}</p>
                )}
              </div>
              <div className="sexe">
                <label className="block font-medium text-gray-700 mb-1">sexe</label>
                <select
                  className={`bg-white text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#7A3B3F] transition-all duration-300 outline-none ${errors.sexe ? 'border-red-400' : 'border-gray-300'}`}
                  {...register('sexe')}
                >
                  <option value="">Sélectionner un sexe</option>
                  <option value="directeur">Homme</option>
                  <option value="secretaire">Femme</option>
                </select>
                {errors.sexe && <p className="text-sm text-red-400 mt-1">{errors.sexe.message}</p>}
              </div>
            </div>
          </div>

          {/* section2222 */}
          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>

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

export default AdUpinfostudents
