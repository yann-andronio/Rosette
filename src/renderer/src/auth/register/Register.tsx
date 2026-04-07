import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaEdit } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { ThreeDots } from "react-loader-spinner";
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'

type RegisterProps = {
  closemodal: () => void
}

function Register({ closemodal }: RegisterProps): JSX.Element {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [roles, setRoles] = useState<{ id: number, role_name: string }[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [showUsersModal, setShowUsersModal] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const getRoles = async () => {
    try {
      const { data } = await axiosRequest('GET', 'roles', null, 'token')
      setRoles(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUsers = async () => {
    try {
      const { data } = await axiosRequest('GET', 'users-list', null, 'token')
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRoles()
  }, [])

  const getValidationSchema = () => {
    return yup.object({
      name: yup.string().required('Nom requis'),
      firstname: yup.string().required('Prénom requis'),
      email: yup.string().email('Email invalide').required('Veuillez entrer votre email'),
      password: isEditMode
        ? yup.string().nullable()
        : yup.string().min(6, 'Au moins 6 caractères').required('Mot de passe requis'),
      password_confirmation: isEditMode
        ? yup.string().nullable()
        : yup.string()
            .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
            .required('Veuillez confirmer votre mot de passe'),
      role_id: yup.string().required('Veuillez sélectionner un rôle')
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(getValidationSchema())
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)

    try {
      if (isEditMode && selectedUserId) {
        const res = await axiosRequest('PUT', `user/${selectedUserId}`, data, 'token')
        toast.success(res?.data?.message || 'Utilisateur modifié ✅')
      } else {
        const res = await axiosRequest('POST', 'users-creation', data, 'none')
        toast.success(res?.data?.message || 'Inscription réussie ✅')
      }

      reset()
      setIsEditMode(false)
      setSelectedUserId(null)
      closemodal()

    } catch (err: any) {
      toast.error(err?.response?.data?.message || `Erreur ❌`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (user: any) => {
    setIsEditMode(true)
    setSelectedUserId(user.id)

    setValue('name', user.name)
    setValue('firstname', user.firstname)
    setValue('email', user.email)
    setValue('role_id', user.role_id)

    setShowUsersModal(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative overflow-hidden">

        <button
          onClick={closemodal}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-3xl font-bold text-center text-[#7A3B3F] mb-6">
          {isEditMode ? 'Modifier utilisateur' : 'Inscription'}
        </h2>

        <button
          onClick={() => {
            getUsers()
            setShowUsersModal(true)
          }}
          className="mb-4 w-full border border-[#7A3B3F] text-[#7A3B3F] p-2 rounded-lg hover:bg-[#7A3B3F] hover:text-white transition"
        >
          Voir les utilisateurs
        </button>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          {/* Nom + prénom */}
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom"
                  className={`w-full border p-3 pl-10 rounded-lg ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                  {...register('name')}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="flex-1">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Prénom"
                  className={`w-full border p-3 pl-10 rounded-lg ${errors.firstname ? 'border-red-400' : 'border-gray-300'}`}
                  {...register('firstname')}
                />
              </div>
              {errors.firstname && <p className="text-sm text-red-500">{errors.firstname.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className={`w-full border p-3 pl-10 rounded-lg ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={isEditMode ? "Nouveau mot de passe (optionnel)" : "Mot de passe"}
                className={`w-full border p-3 pl-10 rounded-lg ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                {...register('password')}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm */}
          {!isEditMode && (
            <div>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmer"
                  className={`w-full border p-3 pl-10 rounded-lg ${errors.password_confirmation ? 'border-red-400' : 'border-gray-300'}`}
                  {...register('password_confirmation')}
                />
              </div>
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
              )}
            </div>
          )}

          {/* Role */}
          <div>
            <select
              className={`w-full border p-3 rounded-lg ${errors.role_id ? 'border-red-400' : 'border-gray-300'}`}
              {...register('role_id')}
            >
              <option value="">Sélectionner un rôle</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.role_name}</option>
              ))}
            </select>
            {errors.role_id && <p className="text-sm text-red-500">{errors.role_id.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7A3B3F] text-white p-3 rounded-lg hover:bg-[#5E2B2F]"
          >
            {isLoading ? <ThreeDots height="20" width="50" color="white" /> :
              isEditMode ? 'Modifier' : "S'inscrire"}
          </button>
        </form>
      </div>

      {/* MODAL USERS */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg relative">

            <button onClick={() => setShowUsersModal(false)} className="absolute top-4 right-4">
              <FiX />
            </button>

            <h3 className="text-xl font-bold text-[#7A3B3F] mb-4">
              Liste des utilisateurs
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users?.map((user) => (
                <div key={user.id} className="flex justify-between items-center border p-3 rounded-lg">
                  <div>
                    <p className="font-semibold">{user.name} {user.firstname}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={() => handleEdit(user)}
                    className="flex items-center gap-2 text-[#7A3B3F] hover:text-white hover:bg-[#7A3B3F] px-3 py-1 rounded-lg transition"
                  >
                    <FaEdit /> Modifier
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Register