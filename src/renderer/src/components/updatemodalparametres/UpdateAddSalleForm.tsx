import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { axiosRequest } from '@renderer/config/helpers'
import { FiEdit } from 'react-icons/fi'

type FormDataSalle = {
  nom_salle: string
  effectif: number
  cl_id: number
}

type SalleData = {
  id: number
  nom_salle: string
  effectif: number
  classes: { id: number; nom_classe: string }
}

type UpdateAddSalleFormProps = {
  SalleData: SalleData
  niveau: { id: number; nom_classe: string }[]
  onClose: () => void
  onUpdateSuccess: () => void
}

const schema = yup.object({
  nom_salle: yup.string().required('Le nom de la salle est requis'),
  effectif: yup
    .number()
    .typeError('L’effectif doit être un nombre')
    .positive('L’effectif doit être supérieur à 0')
    .integer('L’effectif doit être un entier')
    .required('L’effectif est requis'),
  cl_id: yup.number().required('Sélectionnez un niveau')
})

const UpdateAddSalleForm: React.FC<UpdateAddSalleFormProps> = ({
  SalleData,
  niveau,
  onClose,
  onUpdateSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormDataSalle>({
    resolver: yupResolver(schema),
    defaultValues: {
      nom_salle: SalleData.nom_salle,
      effectif: SalleData.effectif,
      cl_id: SalleData.classes.id
    }
  })

  const selectedNiveau = watch('cl_id')

  const onSubmit = async (data: FormDataSalle) => {
    setIsLoading(true)
    try {
     await axiosRequest('PUT', `salle-update/${SalleData.id}`, data, 'token')
        .then((res) =>       toast.success(res.data?.message || 'Salle modifiée '))
       .then(() =>onUpdateSuccess() )
        .catch((error) => toast.error('Erreur lors de la modification:'+error.response.data.message))

    } catch (error) {
      toast.error('Erreur lors de la modification ')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="Nom de la salle"
        {...register('nom_salle')}
        className={`w-full px-5 py-3 border rounded-xl ${
          errors.nom_salle ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors.nom_salle && <p className="text-sm text-red-400">{errors.nom_salle.message}</p>}

      <input
        type="number"
        placeholder="Effectif"
        {...register('effectif')}
        className={`w-full px-5 py-3 border rounded-xl ${
          errors.effectif ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors.effectif && <p className="text-sm text-red-400">{errors.effectif.message}</p>}

      <h2 className="font-semibold text-gray-800">Sélectionnez un niveau</h2>
      <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl border-gray-300 bg-white border">
        {niveau.map(({ id, nom_classe }) => (
          <div
            key={id}
            onClick={() => setValue('cl_id', id)}
            className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer border ${
              selectedNiveau === id
                ? 'bg-[#895256] text-white'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {nom_classe}
          </div>
        ))}
      </div>
      {errors.cl_id && <p className="text-sm text-red-400">{errors.cl_id.message}</p>}

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-red-500 hover:text-white"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          {isLoading ? (
            <ThreeDots visible height="20" width="40" color="white" />
          ) : (
            <>
              <FiEdit size={18} /> Modifier
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default UpdateAddSalleForm
