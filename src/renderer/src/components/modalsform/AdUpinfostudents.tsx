import { FiPlus, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../images/test.png'

type infostudentsProps = {
  closemodal: () => void
}

const AdUpinfostudents: React.FC<infostudentsProps> = ({ closemodal }) => {
  const ValidationSchema = yup.object({
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
        <div className="flex items-center justify-center    mb-12">
          <h2 className=" text-2xl font-bold text-gray-800 flex items-center gap-2">
            Information de l'eleve
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
                  <img className="w-[40%]" src={logo} alt="Logo" />
                </div>
              </div>
              <div className="nomandprenom flex gap-3">
                <div className="nom">
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

                <div className="prenom">
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
              </div>

              <div className="sexe">
                <label className="block font-medium text-gray-700 mb-1">sexe</label>
                <select
                  className={` bg-[#F1F1F1]  text-black w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#7A3B3F] transition-all duration-300 outline-none ${errors.sexe ? 'border-red-400' : 'border-gray-300'}`}
                  {...register('sexe')}
                >
                  <option value="">Sélectionner un sexe</option>
                  <option value="directeur">Homme</option>
                  <option value="secretaire">Femme</option>
                </select>
                {errors.sexe && <p className="text-sm text-red-400 mt-1">{errors.sexe.message}</p>}
              </div>

              <div className="adresse">
                <label className="block font-medium text-gray-700 mb-1">adresse</label>
                <input
                  type="text"
                  placeholder="ambohipo"
                  {...register('adresse')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.adresse ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.adresse && (
                  <p className="text-sm text-red-400 mt-1">{errors.adresse.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* section222222222222222222222222222222222222222 */}
          <div className="flex-1">
            <div className="champ2 flex flex-col gap-4 ">
              <div className="adresse">
                <label className="block font-medium text-gray-700 mb-1">date de naissance</label>
                <input
                  type="date"
                  {...register('date_naissance')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.date_naissance ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.date_naissance && (
                  <p className="text-sm text-red-400 mt-1">{errors.date_naissance.message}</p>
                )}
              </div>

              <div className="adresse">
                <label className="block font-medium text-gray-700 mb-1">lieu de naissance</label>
                <input
                  type="text"
                  placeholder="Tana"
                  {...register('lieu_naissance')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.lieu_naissance ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.lieu_naissance && (
                  <p className="text-sm text-red-400 mt-1">{errors.lieu_naissance.message}</p>
                )}
              </div>

              <div className="nom_pereandprenom_pere flex gap-3">
                <div className="nom_pere">
                  <label className="block font-medium text-gray-700 mb-1">nom du pere</label>
                  <input
                    type="text"
                    placeholder="rajao"
                    {...register('nom_pere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.nom_pere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.nom_pere && (
                    <p className="text-sm text-red-400 mt-1">{errors.nom_pere.message}</p>
                  )}
                </div>

                <div className="prenom">
                  <label className="block font-medium text-gray-700 mb-1">prenom du pere</label>
                  <input
                    type="text"
                    placeholder="kely"
                    {...register('prenom_pere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.prenom_pere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.prenom_pere && (
                    <p className="text-sm text-red-400 mt-1">{errors.prenom_pere.message}</p>
                  )}
                </div>
              </div>

              <div className="nom_mereandprenom_pere flex gap-3">
                <div className="nom_mere">
                  <label className="block font-medium text-gray-700 mb-1">nom du mere</label>
                  <input
                    type="text"
                    placeholder="rasoa"
                    {...register('nom_mere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.nom_mere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.nom_mere && (
                    <p className="text-sm text-red-400 mt-1">{errors.nom_mere.message}</p>
                  )}
                </div>

                <div className="prenom">
                  <label className="block font-medium text-gray-700 mb-1">prenom du mere</label>
                  <input
                    type="text"
                    placeholder="be"
                    {...register('prenom_mere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.prenom_mere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.prenom_mere && (
                    <p className="text-sm text-red-400 mt-1">{errors.prenom_mere.message}</p>
                  )}
                </div>
              </div>

              <div className="tel_pere">
                <label className="block font-medium text-gray-700 mb-1">telephone du pere</label>
                <input
                  type="tel"
                  {...register('tel_pere')}
                  placeholder="0342290407"
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.tel_pere ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.tel_pere && (
                  <p className="text-sm text-red-400 mt-1">{errors.tel_pere.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* section33333333333333333333333333333333333333 */}
          <div className="flex-1">
            <div className="champ3 flex flex-col gap-4 ">
              <div className="adresse">
                <label className="block font-medium text-gray-700 mb-1">telephone du mere</label>
                <input
                  type="tel"
                  {...register('tel_mere')}
                  placeholder="0342290407"
                  className={`w-full px-4 py-2.5 border border-[#895256] bg-[#F1F1F1] ${
                    errors.tel_mere ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.tel_mere && (
                  <p className="text-sm text-red-400 mt-1">{errors.tel_mere.message}</p>
                )}
              </div>

              <div className="nom_tuteurandprenom_pere flex gap-3">
                <div className="nom_tuteur">
                  <label className="block font-medium text-gray-700 mb-1">nom du tuteur</label>
                  <input
                    type="text"
                    placeholder="razafi"
                    {...register('nom_tuteur')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.nom_tuteur ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.nom_tuteur && (
                    <p className="text-sm text-red-400 mt-1">{errors.nom_tuteur.message}</p>
                  )}
                </div>

                <div className="prenom_tuteur">
                  <label className="block font-medium text-gray-700 mb-1">prenom du tuteur</label>
                  <input
                    type="text"
                    placeholder="jean"
                    {...register('prenom_tuteur')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.prenom_tuteur ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.prenom_tuteur && (
                    <p className="text-sm text-red-400 mt-1">{errors.prenom_tuteur.message}</p>
                  )}
                </div>
              </div>

              <div className="tel_tuteur">
                <label className="block font-medium text-gray-700 mb-1">telephone du tuteur</label>
                <input
                  type="tel"
                  placeholder="0342290407"
                  {...register('tel_tuteur')}
                  className={`w-full px-4 py-2.5 border border-[#895256] bg-[#F1F1F1]  ${
                    errors.tel_tuteur ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.tel_tuteur && (
                  <p className="text-sm text-red-400 mt-1">{errors.tel_tuteur.message}</p>
                )}
              </div>

              <div className="matricule">
                <label className="block font-medium text-gray-700 mb-1">matricule</label>
                <input
                  type="text"
                  {...register('matricule')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.matricule ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.matricule && (
                  <p className="text-sm text-red-400 mt-1">{errors.matricule.message}</p>
                )}
              </div>

              <div className="ecole_prec">
                <label className="block font-medium text-gray-700 mb-1">
                  dernier ecole frequente
                </label>
                <input
                  type="text"
                  {...register('ecole_prec')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.tel_pere ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.ecole_prec && (
                  <p className="text-sm text-red-400 mt-1">{errors.ecole_prec.message}</p>
                )}
              </div>
            </div>
          </div>{' '}
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

export default AdUpinfostudents
