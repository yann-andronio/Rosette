import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { axiosRequest } from '@renderer/config/helpers'
import { Monthlistedata } from '@renderer/data/Monthlistedata'



const schema = yup.object({
  yearadd: yup.string().required('Vous devez saisir une année'),
  selectedMonths: yup
    .array()
    .of(yup.number())
    .min(1, 'Sélectionnez au moins un mois')
    .required('Sélectionnez au moins un mois'),
  debut: yup.string().required('Vous devez saisir un mois de début')
})

const UpdateAddYearsForm = ({ yearData, onClose, onUpdateSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const initialSelectedMonthsIds = yearData.mois.map((m) => Monthlistedata.find((md) => md.name === m.mois)?.id).filter((id) => id !== undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      yearadd: yearData.annee,
      selectedMonths: initialSelectedMonthsIds,
      debut: yearData.debut || ''
    }
  })

  const selectedMonths = watch('selectedMonths', initialSelectedMonthsIds)

  const handleMonthClick = (id) => {
    const updated = selectedMonths.includes(id)
      ? selectedMonths.filter((mid) => mid !== id)
      : [...selectedMonths, id]

    setValue('selectedMonths', updated, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const donneAlefa = {
      annee: data.yearadd,
      mois: Monthlistedata.filter((m) => data.selectedMonths.includes(m.id)).map((m) => m.name),
      debut: data.debut
    }

    // try {
    //   await axiosRequest('PUT', `ac-update/${yearData.id}`, donneAlefa, 'token') solon nla fogna ty************************************************
    //     .then(({ data }) => toast.success(data?.message || 'Année scolaire modifiée '))
    //     .then(() => onUpdateSuccess())
    //     .catch((error) =>
    //       toast.error(error?.response?.data?.message || 'Erreur lors de la modification ')
    //     )
    // } catch (error) {
    //   toast.error('Le serveur ne répond pas ')
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ex: 2025"
          {...register('yearadd')}
          className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${errors.yearadd ? 'border-red-500 shadow-[0_0_5px_#f87171]' : 'border-gray-300 shadow-sm'}`}
        />
        {errors.yearadd && <p className="text-sm text-red-400 mt-1">{errors.yearadd.message as any}</p>}
      </div>

      <div className="mt-6">
        <select
          {...register('debut')}
          className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${errors.debut ? 'border-red-500 shadow-[0_0_5px_#f87171]' : 'border-gray-300 shadow-sm'}`}
        >
          <option value="">Selectionner Mois de Début</option>
          {Monthlistedata.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
        {errors.debut && <p className="text-sm text-red-400 mt-1">{errors.debut.message as string}</p>}
      </div>

      <div className="mt-6">
        <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez les mois</h2>
        <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-4 rounded-xl border-gray-300 bg-white border">
          {Monthlistedata.map((month) => {
            const isSelected = selectedMonths.includes(month.id)
            return (
              <div
                key={month.id}
                onClick={() => handleMonthClick(month.id)}
                className={`text-sm font-medium text-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#895256] text-white border-[#895256]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {month.name}
              </div>
            )
          })}
        </div>
        {errors.selectedMonths && (
          <p className="text-sm text-red-400 mt-1">{errors.selectedMonths.message as string}</p>
        )}
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
            <>Modifier</>
          )}
        </button>
      </div>
    </form>
  )
}

export default UpdateAddYearsForm
