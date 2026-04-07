import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { axiosRequest } from '@renderer/config/helpers'
import { FiEdit, FiX } from 'react-icons/fi'



interface FormValues {
  name: string
  owner: string
  telephone: string
  email: string
  adresse: string
  decision: string
  code: string
}

type EcoleData = {
  id: number
  name: string
  owner: string
  telephone: string
  email: string
  adresse: string
  decision: string
  code: string
}

type UpdateTitreEcoleFormProps = {
  ecoleData: EcoleData
  closemodal: () => void
  onUpdateSuccess: () => void
}


const champsFormulaire: {
  name: keyof FormValues
  label: string
  placeholder: string
  type?: string
}[] = [
  { name: 'name', label: "Titre de l'établissement", placeholder: 'Ex: ROSETTE II' },
  { name: 'owner', label: 'Directeur', placeholder: 'Ex: Jean Dupont' },
  { name: 'telephone', label: 'Téléphone', placeholder: 'Ex: 034 00 000 00', type: 'tel' },
  { name: 'email', label: 'Email', placeholder: 'Ex: ecole@example.com', type: 'email' },
  { name: 'adresse', label: 'Adresse', placeholder: 'Ex: Lot II A 123 Antananarivo' },
  { name: 'decision', label: 'Décision', placeholder: 'Ex: Décision N° 001/2024' },
  { name: 'code', label: 'Code', placeholder: 'Ex: SCO-001' }
]


const schema = yup.object({
  name: yup.string().required('Le titre est requis'),
  owner: yup.string().required('Le Directeur est requis'),
  telephone: yup.string().required('Le téléphone est requis'),
  email: yup.string().required("L'email est requis"),
  adresse: yup.string().required("L'adresse est requise"),
  decision: yup.string().required('La décision est requise'),
  code: yup.string().required('Le code est requis')
})



const UpdateTitreEcoleForm: React.FC<UpdateTitreEcoleFormProps> = ({
  ecoleData,
  closemodal,
  onUpdateSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: ecoleData.name,
      owner: ecoleData.owner,
      telephone: ecoleData.telephone,
      email: ecoleData.email,
      adresse: ecoleData.adresse,
      decision: ecoleData.decision,
      code: ecoleData.code
    }
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      await axiosRequest('PUT', `school/${ecoleData.id}`, data, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => onUpdateSuccess())
        .catch((err) =>
          toast.error(err.response?.data?.message || 'Erreur lors de la modification')
        )
    } catch (err) {
      console.log(err)
      toast.error('Erreur serveur')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center text-white gap-3 mb-5">
        <h1 className="text-2xl font-bold">Modifier l&apos;établissement</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-end mb-4">
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {champsFormulaire.map(({ name, label, placeholder, type }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input
                type={type || 'text'}
                {...register(name)}
                placeholder={placeholder}
                className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
                  errors[name]
                    ? 'border-red-500 shadow-[0_0_5px_#f87171]'
                    : 'border-gray-300 shadow-sm'
                }`}
              />
              {errors[name] && <p className="text-sm text-red-400 mt-1">{errors[name]?.message}</p>}
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={closemodal}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white transition-all font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold flex items-center gap-2"
            >
              {isLoading ? (
                <ThreeDots visible={true} height="20" width="50" color="white" radius="9" />
              ) : (
                <>
                  <FiEdit size={18} /> Modifier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTitreEcoleForm
