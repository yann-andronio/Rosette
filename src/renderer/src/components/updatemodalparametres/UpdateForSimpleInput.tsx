import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'
import { FiX } from 'react-icons/fi'
import { ThreeDots } from 'react-loader-spinner'

interface UpdateForSimpleInputProps {
  id: number
  defaultValue: string
  fieldName: string
  title: string
  placeholder: string
  updateUrl: string
  closemodal: () => void
  reload: () => void
}

export default function UpdateForSimpleInput({
  id,
  defaultValue,
  fieldName,
  title,
  placeholder,
  updateUrl,
  closemodal,
  reload
}: UpdateForSimpleInputProps) {
  const [isLoading, setIsLoading] = useState(false)

  const schema = yup.object({
    [fieldName]: yup.string().required(`Le ${fieldName} est requis`)
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { [fieldName]: defaultValue }
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    console.log(data)
    try {
      await axiosRequest('PUT', `${updateUrl}/${id}`, data, 'token')
      toast.success(`${title} mis à jour avec succès`)
      reload()
      closemodal()
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            {...register(fieldName)}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-[#895256] ${
              errors[fieldName] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors[fieldName] && (
            <p className="text-sm text-red-600">{(errors[fieldName]?.message as string) || ''}</p>
          )}

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={closemodal}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#895256] text-white flex items-center gap-2"
            >
              {isLoading ? (
                <ThreeDots visible={true} height="20" width="50" color="white" radius="9" />
              ) : (
                'Mettre à jour'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
