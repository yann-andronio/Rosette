import { FiPlus, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../images/test.png'

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
    datenaissance: yup.string().required('Date de naissance requise'),
    lieunaissance: yup.string().required('Lieu de naissance requis'),
    nompere: yup.string(),
    prenompere: yup.string(),
    nommere: yup.string(),
    prenommere: yup.string(),
    telpere: yup.string(),
    telmere: yup.string(),
    nomtuteur: yup.string(),
    prenomtuteur: yup.string(),
    teltuteur: yup.string(),
    matricule: yup.string(),
    ecoleprec: yup.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(ValidationSchema) })

  const onSubmit = (data: any) => {
    alert("mipa")
    console.log(data)
    reset()
    closemodal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl w-full max-w-[90%] p-6 animate-fade-in"
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
                  {...register('datenaissance')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.datenaissance ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.datenaissance && (
                  <p className="text-sm text-red-400 mt-1">{errors.datenaissance.message}</p>
                )}
              </div>

              <div className="adresse">
                <label className="block font-medium text-gray-700 mb-1">lieu de naissance</label>
                <input
                  type="text"
                  placeholder="Tana"
                  {...register('lieunaissance')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.lieunaissance ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.lieunaissance && (
                  <p className="text-sm text-red-400 mt-1">{errors.lieunaissance.message}</p>
                )}
              </div>

              <div className="nompereandprenompere flex gap-3">
                <div className="nompere">
                  <label className="block font-medium text-gray-700 mb-1">nom du pere</label>
                  <input
                    type="text"
                    placeholder="rajao"
                    {...register('nompere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.nompere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.nompere && (
                    <p className="text-sm text-red-400 mt-1">{errors.nompere.message}</p>
                  )}
                </div>

                <div className="prenom">
                  <label className="block font-medium text-gray-700 mb-1">prenom du pere</label>
                  <input
                    type="text"
                    placeholder="kely"
                    {...register('prenompere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.prenompere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.prenompere && (
                    <p className="text-sm text-red-400 mt-1">{errors.prenompere.message}</p>
                  )}
                </div>
              </div>

              <div className="nommereandprenompere flex gap-3">
                <div className="nommere">
                  <label className="block font-medium text-gray-700 mb-1">nom du mere</label>
                  <input
                    type="text"
                    placeholder="rasoa"
                    {...register('nommere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.nommere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.nommere && (
                    <p className="text-sm text-red-400 mt-1">{errors.nommere.message}</p>
                  )}
                </div>

                <div className="prenom">
                  <label className="block font-medium text-gray-700 mb-1">prenom du mere</label>
                  <input
                    type="text"
                    placeholder="be"
                    {...register('prenommere')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.prenommere ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.prenommere && (
                    <p className="text-sm text-red-400 mt-1">{errors.prenommere.message}</p>
                  )}
                </div>
              </div>

              <div className="telpere">
                <label className="block font-medium text-gray-700 mb-1">telephone du pere</label>
                <input
                  type="tel"
                  {...register('telpere')}
                  placeholder="0342290407"
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.telpere ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.telpere && (
                  <p className="text-sm text-red-400 mt-1">{errors.telpere.message}</p>
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
                  {...register('telmere')}
                  placeholder="0342290407"
                  className={`w-full px-4 py-2.5 border border-[#895256] bg-[#F1F1F1] ${
                    errors.telmere ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.telmere && (
                  <p className="text-sm text-red-400 mt-1">{errors.telmere.message}</p>
                )}
              </div>

              <div className="nomtuteurandprenompere flex gap-3">
                <div className="nomtuteur">
                  <label className="block font-medium text-gray-700 mb-1">nom du tuteur</label>
                  <input
                    type="text"
                    placeholder="razafi"
                    {...register('nomtuteur')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.nomtuteur ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.nomtuteur && (
                    <p className="text-sm text-red-400 mt-1">{errors.nomtuteur.message}</p>
                  )}
                </div>

                <div className="prenomtuteur">
                  <label className="block font-medium text-gray-700 mb-1">prenom du tuteur</label>
                  <input
                    type="text"
                    placeholder="jean"
                    {...register('prenomtuteur')}
                    className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                      errors.prenomtuteur ? 'border-red-400' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                  />
                  {errors.prenomtuteur && (
                    <p className="text-sm text-red-400 mt-1">{errors.prenomtuteur.message}</p>
                  )}
                </div>
              </div>

              <div className="teltuteur">
                <label className="block font-medium text-gray-700 mb-1">telephone du tuteur</label>
                <input
                  type="tel"
                  placeholder="0342290407"
                  {...register('teltuteur')}
                  className={`w-full px-4 py-2.5 border border-[#895256] bg-[#F1F1F1]  ${
                    errors.teltuteur ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.teltuteur && (
                  <p className="text-sm text-red-400 mt-1">{errors.teltuteur.message}</p>
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

              <div className="ecoleprec">
                <label className="block font-medium text-gray-700 mb-1">
                  dernier ecole frequente
                </label>
                <input
                  type="text"
                  {...register('ecoleprec')}
                  className={`w-full px-4 py-2.5 border border-[#895256]  bg-[#F1F1F1]  ${
                    errors.telpere ? 'border-red-400' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#895256] text-gray-700 placeholder:text-gray-400`}
                />
                {errors.ecoleprec && (
                  <p className="text-sm text-red-400 mt-1">{errors.ecoleprec.message}</p>
                )}
              </div>
            </div>
          </div>{' '}
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

export default AdUpinfostudents
