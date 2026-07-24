import React, { useEffect, useState } from 'react'
import { FiX, FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ConfirmDeleteModal from '@renderer/components/modalsform/ConfirmDeleteModal'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'

const schema = yup.object({
  name: yup.string().required('Nom requis'),
  firstname: yup.string().required('Prénom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().optional()
})

type UserProfile = {
  name?: string
  firstname?: string
  email?: string
  role: string
  id: number
}

type FormData = {
  name: string
  firstname: string
  email: string
  password?: string
}

type ProfileModalProps = {
  onClose: () => void
  user: UserProfile
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, user }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      firstname: '',
      email: ''
    }
  })

  useEffect(() => {
    reset({
      name: user?.name ?? '',
      firstname: user?.firstname ?? '',
      email: user?.email ?? ''
    })
  }, [user, reset])
 
  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await axiosRequest('PUT', `user/${user?.id}`, data)
        .then(({ data }) => toast.success(data.message || 'Profil modifié avec succès'))
        .then(() => onClose())
        .catch((err) => toast.error(err.response?.data?.message || 'Erreur'))
    } catch (err) {
      console.log(err)
      toast.error('Erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN')
    window.location.hash = '/'
  }

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#212529]">Mon Profil</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors"
              aria-label="Se déconnecter"
            >
              <FiLogOut size={16} />
              Déconnexion
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 ml-1">
              <FiX size={22} />
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-[#895256] text-white flex items-center justify-center text-3xl font-bold">
            {user?.firstname?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Nom</label>
            <input
              {...register('name')}
              className={`w-full mt-1 px-4 py-3 rounded-xl border
                ${errors.name ? 'border-red-500' : 'border-gray-300'}
                focus:ring-2 focus:ring-[#895256]`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Prénom</label>
            <input
              {...register('firstname')}
              className={`w-full mt-1 px-4 py-3 rounded-xl border
                ${errors.firstname ? 'border-red-500' : 'border-gray-300'}
                focus:ring-2 focus:ring-[#895256]`}
            />
            {errors.firstname && (
              <p className="text-sm text-red-500 mt-1">{errors.firstname.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              {...register('email')}
              className={`w-full mt-1 px-4 py-3 rounded-xl border
                ${errors.email ? 'border-red-500' : 'border-gray-300'}
                focus:ring-2 focus:ring-[#895256]`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Nouveau mot de passe</label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="mot de passe"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#895256]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#895256]"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Rôle</label>
            <input
              disabled
              value={user?.role ?? ''}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#895256] hover:bg-[#733935] text-white'}
                           `}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enregistrement...
                </>
              ) : (
                'Enregistrer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>

    {showLogoutConfirm && (
      <ConfirmDeleteModal
        title="Confirmer la déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ? Vous serez redirigé vers la page de connexion."
        onConfirm={handleLogout}
        closemodal={() => setShowLogoutConfirm(false)}
        isDeletingLoader={false}
      />
    )}
    </>
  )
}

export default ProfileModal
