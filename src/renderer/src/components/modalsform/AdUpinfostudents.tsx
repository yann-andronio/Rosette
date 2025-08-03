import { FiPlus, FiUser, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../images/test.png'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'

type infostudentsProps = {
  closemodal: () => void
  mode: 'ajoutstudents' | 'modifstudents'
}

const schema = yup.object().shape({
  nom: yup.string().required('Nom requis'),
  prenom: yup.string().required('Prénom requis'),
  sexe: yup.string().required('Sexe requis'),
  date_naissance: yup.string().required('Date de naissance requise'),
  lieu_naissance: yup.string().required('Lieu de naissance requis'),
  adresse: yup.string().required('Adresse requise'),
  nom_pere: yup.string(),
  prenom_pere: yup.string(),
  tel_pere: yup.string(),
  nom_mere: yup.string(),
  prenom_mere: yup.string(),
  tel_mere: yup.string(),
  nom_tuteur: yup.string(),
  prenom_tuteur: yup.string(),
  tel_tuteur: yup.string(),
  matricule: yup.string(),
  ecole_prec: yup.string()
})

const AdUpinfostudents: React.FC<infostudentsProps> = ({ closemodal , mode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
  

  // const refs = useRef<string | Blob>('')
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<Blob | string>('')

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files[0]) {
      const reader = new FileReader()
      const file = e.target?.files[0]

      setImage(file)
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data: any) => {
    console.log(data)
    const formdata = new FormData()
    formdata.append('image', image)
     for (const key in data) {
       formdata.append(key, data[key])
     }
    console.log(Image)

      if (mode === 'ajoutstudents') {
        console.log('Ajouter étudiant', data)
        // req axio
      } else {
        console.log('Modifier étudiant', data)
        // req axios
    }
    closemodal()
  }

  const [imageforprofil, setImageforprofil] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white w-[75%] h-[550px] rounded-2xl flex shadow-2xl overflow-hidden">
        {/* DESIGN DROIT */}
        <div className="w-1/2 bg-[#895256] flex flex-col items-center justify-center p-8 relative">
          <div className="flex flex-col items-center mb-10">
            <label htmlFor="photo" className="cursor-pointer">
              <input
                type="file"
                onChange={change}
                id="photo"
                accept="image/*"
                // {...register('photo')}
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Photo étudiante"
                  className="w-40 h-40 object-cover rounded-full border-4 border-white mb-10 shadow-lg"
                />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center rounded-full bg-[#6b4a52] border-4 border-white mb-10 shadow-lg">
                  <FiUser className="text-white text-[7rem]" />
                </div>
              )}
            </label>

            <span className="text-sm text-white">Cliquez pour choisir une photo</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3 text-center tracking-wide">
            Bienvenue dans le module étudiant
          </h2>
          <p className="text-base text-white text-center mb-10 px-6 leading-relaxed">
            Remplissez les informations à gauche pour ajouter un nouvel étudiant à votre base de
            données.
          </p>
        </div>

        {/* section formul droite */}
        <div className="w-1/2 p-10 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            {mode === "modifstudents" ? (
              <h2 className="text-3xl font-bold text-[#895256] tracking-tight">Modifier cet étudiant </h2>
            ) : (
              <h2 className="text-3xl font-bold text-[#895256] tracking-tight">Ajouter Étudiant</h2>)
            }
            <button
              onClick={closemodal}
              aria-label="Fermer"
              className="text-gray-600 hover:text-red-600 transition"
            >
              <FiX className="text-3xl" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto pr-3"
            style={{ maxHeight: '460px' }}
          >
            {/* IG */}
            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Informations générales
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Sexe *</label>
                <select
                  {...register('sexe')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.sexe
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                >
                  <option value="">Sélectionnez</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
                {errors.sexe && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.sexe.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance *
                </label>
                <input
                  type="date"
                  {...register('date_naissance')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.date_naissance
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                />
                {errors.date_naissance && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.date_naissance.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu de naissance *
                </label>
                <input
                  type="text"
                  {...register('lieu_naissance')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.lieu_naissance
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Entrez le lieu de naissance"
                />
                {errors.lieu_naissance && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.lieu_naissance.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                <input
                  type="text"
                  {...register('adresse')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.adresse
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Entrez l'adresse"
                />
                {errors.adresse && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.adresse.message}
                  </p>
                )}
              </div>
            </fieldset>

            {/* info parent */}
            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Informations parentales
              </legend>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du père</label>
                <input
                  type="text"
                  {...register('nom_pere')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Nom du père"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom du père
                </label>
                <input
                  type="text"
                  {...register('prenom_pere')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Prénom du père"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone du père
                </label>
                <input
                  type="tel"
                  {...register('tel_pere')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Téléphone du père"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la mère
                </label>
                <input
                  type="text"
                  {...register('nom_mere')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Nom de la mère"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom de la mère
                </label>
                <input
                  type="text"
                  {...register('prenom_mere')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Prénom de la mère"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone de la mère
                </label>
                <input
                  type="tel"
                  {...register('tel_mere')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Téléphone de la mère"
                />
              </div>
            </fieldset>

            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Informations tuteur
              </legend>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du tuteur
                </label>
                <input
                  type="text"
                  {...register('nom_tuteur')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Nom du tuteur"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom du tuteur
                </label>
                <input
                  type="text"
                  {...register('prenom_tuteur')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Prénom du tuteur"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone du tuteur
                </label>
                <input
                  type="tel"
                  {...register('tel_tuteur')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Téléphone du tuteur"
                />
              </div>
            </fieldset>

            {/* autres informations */}
            <fieldset className="mb-8 border border-gray-200 rounded-xl p-6 shadow-sm">
              <legend className="text-[#895256] font-semibold text-xl mb-4 px-2">
                Autres informations
              </legend>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Matricule</label>
                <input
                  type="text"
                  {...register('matricule')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Matricule"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  École précédente
                </label>
                <input
                  type="text"
                  {...register('ecole_prec')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="École précédente"
                />
              </div>
            </fieldset>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a4645a] to-[#7c3f42] text-white py-4 rounded-xl hover:from-[#895256] hover:to-[#623d3e] transition flex justify-center items-center gap-3 font-semibold text-lg shadow-md"
              >
                <FiPlus size={22} />
                 {mode === 'ajoutstudents' ? 'Ajouter' : 'Modifier'}

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdUpinfostudents
