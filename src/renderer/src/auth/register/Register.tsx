import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

// import { useDispatch } from 'react-redux'
// import { setUser } from '../../redux/slice/userSlice'
import { FiX } from 'react-icons/fi'
import { FadeLoader } from "react-spinners";
import { axiosRequest } from '@renderer/config/helpers'

type RegisterProps = {
  closemodal: () => void
}

function Register({ closemodal }: RegisterProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const ValidationSchema = yup.object({
    name: yup.string().required('Nom requis'),
    firstname: yup.string().required('Prénom requis'),
    email: yup.string().email('Email invalide').required('Veuillez entrer votre email'),
    password: yup.string().min(6, 'Au moins 6 caractères').required('Mot de passe requis'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
      .required('Veuillez confirmer votre mot de passe'),
    role: yup.string().required('Veuillez sélectionner un rôle')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(ValidationSchema) })

  // const dispatch = useDispatch()
  const onSubmit = async (data: any) => {
    // dispatch(setUser({ name: data.name, role: data.role }))
    setIsLoading(true)
    try{
      await axiosRequest('POST','users-creation', data, 'none').then(({data})=> {
        alert(data.message)
        setIsLoading(false)
        reset()
        closemodal()
      }).catch((errors) => alert(errors.response.data.message)).finally(() => setIsLoading(false))
    }catch (err){
      alert('Erreur lors de la connexion au serveur')
    }





  }

  return (

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Bouton fermer */}
          <button
            onClick={closemodal}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          >
            <FiX size={20} />
          </button>

          <h2 className="text-3xl font-bold text-center text-[#7A3B3F] mb-6">Inscription</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex gap-3">
              <div className="flex-1">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nom"
                    className={`w-full border p-3 pl-10 rounded-lg focus:ring-2 outline-none ${
                      errors.name ? 'border-red-400' : 'border-gray-300'
                    }`}
                    {...register('name')}
                  />
                </div>
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="flex-1">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Prénom"
                    className={`w-full border p-3 pl-10 rounded-lg focus:ring-2 outline-none ${
                      errors.firstname ? 'border-red-400' : 'border-gray-300'
                    }`}
                    {...register('firstname')}
                  />
                </div>
                {errors.firstname && <p className="text-sm text-red-500">{errors.firstname.message}</p>}
              </div>
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className={`w-full border p-3 pl-10 rounded-lg focus:ring-2 outline-none ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                className={`w-full border p-3 pl-10 rounded-lg focus:ring-2 outline-none ${
                  errors.password ? 'border-red-400' : 'border-gray-300'
                }`}
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmer le mot de passe"
                className={`w-full border p-3 pl-10 rounded-lg focus:ring-2 outline-none ${
                  errors.password_confirmation ? 'border-red-400' : 'border-gray-300'
                }`}
                {...register('password_confirmation')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
            )}

            <select
              className={`w-full border p-3 rounded-lg focus:ring-2 outline-none ${
                errors.role ? 'border-red-400' : 'border-gray-300'
              }`}
              {...register('role')}
            >
              <option value="">Sélectionner un rôle</option>
              <option value="directeur">Directeur</option>
              <option value="secretaire">Secrétaire</option>
            </select>
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}

            <button
              type="submit"
              className="w-full bg-[#7A3B3F] text-white p-3 rounded-lg hover:bg-[#5E2B2F] transition-all duration-300"
            >
              {isLoading? <FadeLoader color={'#7A3B3F'}   />:'S\'inscrire'}
            </button>


          </form>
        </div>
      </div>

  )
}

export default Register
