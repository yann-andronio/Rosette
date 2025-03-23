import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './login.css'
import logo from '../../images/logo.jpg'
import wave from '../../images/Style-Connection.png'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)

  const ValidationSchema = yup.object({
    email: yup.string().email('Email invalide').required('Veuillez entrer votre email'),
    password: yup.string().min(6, 'Au moins 6 caractères').required('Mot de passe requis')
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
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="w-2/4 flex items-center justify-center bg-white">
        <img className="w-3/4" src={logo} alt="Logo" />
      </div>

      <div className="w-3/4 relative flex items-center justify-center">
        <div className="absolute bg-[#6a2e3e] clip-trapeze"></div>

        <div className="relative z-10 w-full max-w-md p-10 text-white">
          <h2 className="text-4xl font-bold text-center mb-8">Se connecter</h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  className={`bg-white text-black w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#7A3B3F] outline-none ${
                    errors.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Votre e-mail"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <motion.p
                  className="text-sm text-red-400 mt-1"
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="relative flex flex-col">
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`bg-white text-black w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#7A3B3F] outline-none ${
                    errors.password ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Votre mot de passe"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  className="text-sm text-red-400 mt-1"
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#7A3B3F] text-white p-3 rounded-lg hover:bg-[#5E2B2F] transition"
            >
              Valider
            </button>

            <div className="mt-3 text-white flex justify-center">
              <p>Vous n'avez pas de compte?</p>
              <Link to="/register" className="text-white font-semibold hover:underline ml-2">
                Inscription
              </Link>
            </div>
          </form>
        </div>
        <img className="absolute h-full w-full bottom-0" src={wave} alt="Logo" />
      </div>
    </div>
  )
}

export default Login
