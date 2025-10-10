import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { axiosRequest } from '@renderer/config/helpers'
import { FiEdit } from 'react-icons/fi'

type FormDataAlefa = {
  note: string
  ac_id: string
}

type myenneadmdata = {
  note: any
  id: number
  ac_id: string
  acs: { annee: string }
}

type UpdateAdmissonFormProps = {
  myenneadmdata: myenneadmdata
  years: { id: number; annee: string }[]
  onClose: () => void
  onUpdateSuccess: () => void
}

const schema = yup.object({
  note: yup.string().required('Vous devez saisir un nom de classe'),
  ac_id: yup.string().required('Sélectionnez une année')
})

const UpdateAdmissonForm: React.FC<UpdateAdmissonFormProps> = ({
  myenneadmdata,
  years,
  onClose,
  onUpdateSuccess
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormDataAlefa>({
    resolver: yupResolver(schema),
    defaultValues: {
      note: myenneadmdata.note,
      ac_id: myenneadmdata.acs.annee
    }
  })

  const selectedYearforstyle = watch('ac_id')

  const onSubmit = async (data: FormDataAlefa) => {
    setIsLoading(true)
    const anneeScolaireSelectionnee = years.find((y) => y.annee === data.ac_id)
    const ac_id_value = anneeScolaireSelectionnee ? anneeScolaireSelectionnee.id : null

    if (!ac_id_value) {
      toast.error("Erreur: L'id de l'année scolair est introuvable.")
      setIsLoading(false)
      return
    }

    const donneAlefa = {
      note: data.note,
      ac_id: ac_id_value
    }

    try {

      await axiosRequest('PUT', `admission-update/${myenneadmdata.id}`, donneAlefa, 'token')
        .then(({ data }) => toast.success(data?.message || 'Classe modifiée '))
        .then(() => onUpdateSuccess())
        .catch((error) =>
          toast.error(error?.response?.data?.message || 'Erreur lors de la modification ')
        )
    } catch (error) {
      toast.error('Le serveur ne répond pas ')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="note d’admission (ex: 10)"
          {...register('note')}
          className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
            errors.note ? 'border-red-500 shadow-[0_0_5px_#f87171]' : 'border-gray-300 shadow-sm'
          }`}
        />
        {errors.note && <p className="text-sm text-red-400 mt-1">{errors.note.message}</p>}
      </div>

      <div className="mt-6">
        <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez une année</h2>

        {years && years.length && (
          <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl border-gray-300 bg-white border">
            {years.map((year, index) => (
              <div
                key={index}
                onClick={() => setValue('ac_id', year.annee, { shouldValidate: true })}
                className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${
                  selectedYearforstyle === year.annee
                    ? 'bg-[#895256] text-white border-[#895256]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {year.annee}
              </div>
            ))}
          </div>
        )}
        {/* // ) : (
        //   <p className="text-sm text-gray-500 mt-2">Aucune année disponible</p>
        // )} */}

        {errors.ac_id && <p className="text-sm text-red-400 mt-1">{errors.ac_id.message}</p>}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white transition-all font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold flex items-center gap-2"
          disabled={isLoading}
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
  )
}

export default UpdateAdmissonForm
