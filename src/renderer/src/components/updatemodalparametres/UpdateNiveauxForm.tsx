import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { axiosRequest } from '@renderer/config/helpers'
import { FiEdit } from 'react-icons/fi'

type FormDataAlefa = {
  nom_classe: string
  ac_id: string 
  ecolage: number
  kermesse: number
  droit: number
}

type NiveauData = {
  id: number
  nom_classe: string
  ac_id: string
  ecolage: number
  kermesse: number
  droit: number
  acs: { annee: string }
}

type UpdateNiveauxFormProps = {
  NiveauData: NiveauData
  years: { id: number; annee: string }[]
  onClose: () => void
  onUpdateSuccess: () => void
}

const schema = yup.object({
  nom_classe: yup.string().required('Vous devez saisir un nom de classe'),
  ac_id: yup.string().required('Sélectionnez une année'),
  ecolage: yup
    .number()
    .typeError('Le montant doit être un nombre')
    .required('Le montant est requis')
    .min(0, 'Le montant ne peut pas être négatif'),
  kermesse: yup
    .number()
    .typeError('Le montant doit être un nombre')
    .required('Le montant est requis')
    .min(0, 'Le montant ne peut pas être négatif'),
  droit: yup
    .number()
    .typeError('Le montant doit être un nombre')
    .required('Le montant est requis')
    .min(0, 'Le montant ne peut pas être négatif')
})

const UpdateNiveauxForm: React.FC<UpdateNiveauxFormProps> = ({
  NiveauData,
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
      nom_classe: NiveauData.nom_classe,
      ac_id: NiveauData.acs.annee,
      ecolage: NiveauData.ecolage,
      kermesse: NiveauData.kermesse,
      droit: NiveauData.droit,
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
      nom_classe: data.nom_classe,
      ac_id: ac_id_value,
      ecolage: data.ecolage,
      droit: data.droit,
      kermesse: data.kermesse
    }

    // try { 
     
    //   await axiosRequest('PUT', `classe-update/${NiveauData.id}`, donneAlefa, 'token')  solona  endpoint eto
    //     .then(({ data }) => toast.success(data?.message || 'Classe modifiée '))
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
          placeholder="Ex: CM2"
          {...register('nom_classe')}
          className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
            errors.nom_classe
              ? 'border-red-500 shadow-[0_0_5px_#f87171]'
              : 'border-gray-300 shadow-sm'
          }`}
        />
        {errors.nom_classe && (
          <p className="text-sm text-red-400 mt-1">{errors.nom_classe.message}</p>
        )}
      </div>

      <div className="mt-4">
        <input
          type="number"
          placeholder="Frais scolaire (ex: 50000 Ar)"
          {...register('ecolage', { valueAsNumber: true })}
          className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
            errors.ecolage ? 'border-red-500 shadow-[0_0_5px_#f87171]' : 'border-gray-300 shadow-sm'
          }`}
        />
        {errors.ecolage && <p className="text-sm text-red-400 mt-1">{errors.ecolage.message}</p>}
      </div>

      <div className="mt-4">
        <input
          type="number"
          placeholder="Droit scolaire (ex: 50000 Ar)"
          {...register('droit', { valueAsNumber: true })}
          className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
            errors.droit ? 'border-red-500 shadow-[0_0_5px_#f87171]' : 'border-gray-300 shadow-sm'
          }`}
        />
        {errors.droit && <p className="text-sm text-red-400 mt-1">{errors.droit.message}</p>}
      </div>

      <div className="mt-4">
        <input
          type="number"
          placeholder="Kermesse scolaire (ex: 50000 Ar)"
          {...register('kermesse', { valueAsNumber: true })}
          className={`w-full px-5 py-3 border rounded-xl focus:ring-4 focus:ring-[#895256] focus:outline-none transition-shadow duration-300 ${
            errors.kermesse
              ? 'border-red-500 shadow-[0_0_5px_#f87171]'
              : 'border-gray-300 shadow-sm'
          }`}
        />
        {errors.kermesse && <p className="text-sm text-red-400 mt-1">{errors.kermesse.message}</p>}
      </div>

      <div className="mt-6">
        <h2 className="mb-2 font-semibold text-gray-800">Sélectionnez une année</h2>
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

export default UpdateNiveauxForm
