import React, { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  name: yup.string().required('Nom requis'),
  firstname: yup.string().required('Prénom requis'),
  email: yup.string().email('Email invalide').required('Email requis')
})

type UserProfile = {
  name?: string
  firstname?: string
  email?: string
  roles?: {
    role_name?: string
  }
}

type FormData = {
  name: string
  firstname: string
  email: string
}

type ProfileModalProps = {
  onClose: () => void
  user: UserProfile
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, user }) => {
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

  const onSubmit = (data: FormData) => {
    console.log('Profil modifié:', data)
    //magnantso api pour modifier 
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#212529]">Modifier le profil</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500">
            <FiX size={22} />
          </button>
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
            <label className="text-sm font-medium text-gray-600">Rôle</label>
            <input
              disabled
              value={user?.roles?.role_name ?? ''}
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
              className="px-5 py-2 rounded-lg bg-[#895256] text-white hover:bg-[#733935] font-semibold"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileModal
