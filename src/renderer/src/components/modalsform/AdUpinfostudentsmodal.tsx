import { FiEdit, FiPlus, FiUser, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ThreeDots } from 'react-loader-spinner'


import { ChangeEvent, useEffect,  useState } from 'react'

import { axiosRequest } from '@renderer/config/helpers'






type infostudentsProps = {
  closemodal: () => void
  mode: 'ajoutstudents' | 'modifstudents',
  id?:number|null
}

const schema = yup.object().shape({
  nom: yup.string().required('Nom requis'),
  prenom: yup.string().required('Prénom requis'),
  sexe: yup.number().required('Sexe requis'),
  dateNaissance: yup.string().required('Date de naissance requise'),
  lieuNaissance: yup.string().required('Lieu de naissance requis'),
  adresse: yup.string().required('Adresse requise'),
  cl_id: yup.number().required('Veuillez sélectionner un niveau'),
  sa_id: yup.number().required('Veuillez sélectionner une salle'),
  nomPere: yup.string(),
  prenomPere: yup.string(),
  telephonePere: yup.string(),
  nomMere: yup.string(),
  prenomMere: yup.string(),
  telephoneMere: yup.string(),
  nomTuteur: yup.string(),
  prenomTuteur: yup.string(),
  telephoneTuteur: yup.string(),
  // matricule: yup.string(),
  ecole: yup.string(),
  enfantProf: yup.number().required("Veuillez indiquer si l'étudiant est enfant de professeur")
})

const AdUpinfostudentsmodal: React.FC<infostudentsProps> = ({ closemodal, mode, id }) => {
  const [preStudent, setPrestudent] = useState<{ nom: string,
    prenom: string,
    sexe: number,
    photo:string,
    dateNaissance: string,
    lieuNaissance: string,
    adresse: string,
    cl_id: number,
    sa_id: number,
    nomPere: string,
    prenomPere:string,
    telephonePere: string,
    nomMere: string,
    prenomMere: string,
    telephoneMere: string,
    nomTuteur: string,
    prenomTuteur: string,
    telephoneTuteur: string,
    matricule:string,
    ecole: string,
    sousetudiants:{cl_id:number, sa_id:number}[]
    enfantProf: number}|undefined>(undefined)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
  // const refs = useRef<string | Blob>('')
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<Blob | string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [matricule, setMatricule] = useState<string>('')
  const [reload, setReload] = useState<boolean>(false)



  const [salles, setSalles] = useState<{nom_salle:string, id:number}[]>([])
  const [niveau, setNiveau] = useState<{nom_classe:string, id:number}[]>([])

const getSalles = async () => {
    try{
      await axiosRequest('GET', 'salle-list', null, 'token')
        .then(({data}) => setSalles(data))
        .catch(error => console.log(error))
    }catch(error) {
      console.log('Le serveur ne repond pas')
    }
}

  const getClasses = async () => {
    try{
      await axiosRequest('GET', 'classe-list', null, 'token')
        .then(({data}) => setNiveau(data))
        .catch(error => console.log(error))
    }catch(error) {
      console.log('Le serveur ne repond pas')
    }
  }

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

  const onSubmit =async (data: any) => {

    const formdata = new FormData()
    formdata.append('image', image)
    for (const key in data) {
      formdata.append(key, data[key])
    }
    formdata.append('photo', image)
    formdata.append('matricule', matricule)

    if (mode === 'ajoutstudents') {
      setIsLoading(true)
      try {
        await axiosRequest('POST', 'etudiant-creation', formdata, 'token')
          .then(({data}) => console.log(data.message))
          .then(() => reset())
          .then(() => setIsLoading(false))
          .then(() => setReload(!reload))
          .catch(error => console.log(error.response?.data?.message))
          .finally(() => setIsLoading(false))
      }catch(error) {
         console.log('Le serveur ne repond pas')
      }


      // req axio
    } else {
    const form = new FormData()
      form.append('photo', image)
      setIsLoading(true)
      form.append('image', image)
      for (const key in data) {
        form.append(key, data[key])
      }
      form.append('photo', image)
      form.append('matricule', matricule)



      try {
        await axiosRequest('POST', `etudiant/${id}`, form, 'token')
          .then(({data}) => console.log(data.message))
      //     .then(() => reset())
          .then(() => setIsLoading(false))
          .then(() => setReload(!reload))
          .catch(error => console.log(error.response?.data?.message))
          .finally(() => setIsLoading(false))
      }catch(error) {
        console.log('Le serveur ne repond pas')
      }

      closemodal()
    }



  }



  const getPreStudent = async () => {
    try{
      await axiosRequest('GET', `etudiant/${id}`, null, 'token')
        .then(({data}) =>{
          setPrestudent(data)
          reset({...data,
            cl_id: data?.sousetudiants?.[data.sousetudiants.length - 1]?.cl_id,
              sa_id: data?.sousetudiants?.[data.sousetudiants.length - 1]?.sa_id
          })
        })
        .catch(error => console.log(error.response?.data?.message))

    }catch (error){
      console.log('Le serveur ne repond pas')
    }
  }

  const getMatricule = async () => {
    try{
      await axiosRequest('GET', 'etudiant-matricule', null, 'token')
        .then(({data}) => setMatricule(data.matricule))
        .catch(error => console.log(error.response?.data?.message))
    }catch (error){
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getMatricule()
    getSalles()
    getClasses()

  }, [reload])

  useEffect(() => {
    getPreStudent()


  }, [mode==='modifstudents']);




  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white w-[75%] h-[650px] rounded-2xl flex shadow-2xl overflow-hidden">
        {/* DESIGN gauche */}
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
              ) : <>{mode == 'modifstudents' ?   <img
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/uploads/${preStudent?.photo}`}
                alt="Photo étudiante"
                className="w-40 h-40 object-cover rounded-full border-4 border-white mb-10 shadow-lg"
              />:(
                <div className="w-40 h-40 flex items-center justify-center rounded-full bg-[#6b4a52] border-4 border-white mb-10 shadow-lg">
                  <FiUser className="text-white text-[7rem]" />
                </div>
              )}</>}
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
        {mode === 'modifstudents' ? (
              <h2 className="text-3xl font-bold text-[#895256] tracking-tight">
                Modifier cet étudiant{' '}
              </h2>
            ) : (
              <h2 className="text-3xl font-bold text-[#895256] tracking-tight">Ajouter Étudiant</h2>
            )}


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
                  <option value={1}>Homme</option>
                  <option value={0}>Femme</option>
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

                  {...register('dateNaissance')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.dateNaissance
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                />
                {errors.dateNaissance && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.dateNaissance.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu de naissance *
                </label>
                <input
                  type="text"

                  {...register('lieuNaissance')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.lieuNaissance
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                  placeholder="Entrez le lieu de naissance"
                />
                {errors.lieuNaissance && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.lieuNaissance.message}
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

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau *</label>
                <select
                  {...register('cl_id')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.cl_id
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                >
                  <option value="">Sélectionnez un niveau</option>
                  {niveau.map((niv) => (
                    <option  key={niv.id} value={niv.id}>
                      {niv.nom_classe}
                    </option>
                  ))}
                </select>
                {errors.cl_id && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.cl_id.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salle *</label>
                <select
                  {...register('sa_id')}
                  className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                    errors.sa_id
                      ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                      : 'border-gray-300 shadow-sm'
                  }`}
                >
                  <option value="">Sélectionnez une salle</option>
                  {salles.map((sal) => (
                    <option  key={sal.id} value={sal.id}>
                      {sal.nom_salle}
                    </option>
                  ))}
                </select>
                {errors.sa_id && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.sa_id.message}
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

                  {...register('nomPere')}
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

                  {...register('prenomPere')}
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

                  {...register('telephonePere')}
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

                  {...register('nomMere')}
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

                  {...register('prenomMere')}
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

                  {...register('telephoneMere')}
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

                  {...register('nomTuteur')}
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

                  {...register('prenomTuteur')}
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

                  {...register('telephoneTuteur')}
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
                  disabled={true}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="Matricule"
                  defaultValue={mode === 'modifstudents' ?preStudent?.matricule:matricule}
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  École précédente
                </label>
                <input
                  type="text"

                  {...register('ecole')}
                  className="w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none border-gray-300 shadow-sm transition-shadow duration-300"
                  placeholder="École précédente"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Est-il enfant de professeur ? *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-2">
                    <input

                      type="radio"
                      value={1}
                      {...register('enfantProf')}
                      className="accent-[#895256] w-5 h-5"
                    />
                    <span className={`text-gray-700 text-sm font-medium ${getValues('enfantProf')==1?'underline decoration-[#895256]':''}`}>Oui</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"

                      value={0}
                      {...register('enfantProf')}
                      className=" accent-[#895256] w-5 h-5"
                    />
                    <span className={`text-gray-700 text-sm font-medium ${getValues('enfantProf')==0?'underline decoration-[#895256]':''}`}>Non</span>
                  </label>
                </div>
                {errors.enfantProf && (
                  <p className="text-red-500 text-xs mt-1 italic font-semibold">
                    {errors.enfantProf.message}
                  </p>
                )}
              </div>

              {}
            </fieldset>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a4645a] to-[#7c3f42] text-white py-4 rounded-xl hover:from-[#895256] hover:to-[#623d3e] transition flex justify-center items-center gap-3 font-semibold text-lg shadow-md"
              >
                {isLoading? <ThreeDots
                  visible={true}
                  height="23"
                  width="100"
                  color="pink"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />:<>          {mode === 'ajoutstudents' ? <FiPlus size={22} /> : <FiEdit size={22} />}
                  {mode === 'ajoutstudents' ? 'Ajouter' : 'Modifier'}</>}

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdUpinfostudentsmodal
