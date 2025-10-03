import { FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { axiosRequest } from '@renderer/config/helpers'
import { useEffect, useState } from 'react'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'

type ClassModalProps = {
  closemodal: () => void
  statut: 'admis' | 'redoublé'
  onValidated: (statut: string) => void
  setid: number | undefined
  etid: number | undefined
}

type FormData = {
  sa_id: number
}

const Statutupdatesalle: React.FC<ClassModalProps> = ({
  closemodal,
  statut,
  onValidated,
  setid,
  etid
}) => {
  const schema = yup.object({
    sa_id: yup.number().required('Veuillez sélectionner une salle.')
  })

  const [salles, setSalles] = useState<{ nom_salle: string; id: number }[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isBtnLoader, setIsBtnLoader] = useState<boolean>(false)
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const selectedClassForStyle = watch('sa_id')

  const onSubmit = async (data: FormData) => {
   
    onValidated(statut)
     setIsBtnLoader(true)
    try {
      await axiosRequest(
        'POST',
        'etudiant-recreation',
        { ...data, setid: setid, etid: etid },
        'token'
      )
        .then(({ data }) => toast.success(data.message))
        .catch((err) => toast.error(err.response?.data?.error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    } finally {
      setIsBtnLoader(false)
    }
  }

  const getSalles = async () => {
    setIsLoading(true)
    try {
      await axiosRequest('GET', 'salle-list_last', null, 'token')
        .then(({ data }) => setSalles(data))
        .then(() => setIsLoading(false))
        .catch((err) => console.log(err.response?.data?.error))
        .finally(() => setIsLoading(false))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  useEffect(() => {
    getSalles()
  }, [])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#895256]">
            {statut === 'admis' ? 'Admission en salle' : 'Redoublement en salle'}
          </h2>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="mb-2 font-medium text-gray-800">
            Sélectionnez la salle {statut === 'admis' ? 'd’admission' : 'de redoublement'}
          </h3>
          {isLoading ? (
            <RotatingLines
              visible={true}
              
              width="55"
            
              strokeColor="#7A3B3F"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
             
           
            />
          ) : (
            <>
              {' '}
              <div className="grid grid-cols-3 gap-3 max-h-[250px] overflow-y-auto rounded-x p-4 bg-white">
                {salles.map((cl, index) => (
                  <div
                    key={index}
                    onClick={() => setValue('sa_id', cl.id, { shouldValidate: true })}
                    className={`text-center cursor-pointer rounded-lg px-4 py-2 select-none font-medium text-sm transition-all duration-200 border
                  ${selectedClassForStyle === cl.id ? 'bg-[#895256] text-white border-[#895256]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                `}
                  >
                    {cl.nom_salle}
                  </div>
                ))}
              </div>
            </>
          )}

          {errors.sa_id && <p className="text-sm text-red-500 mt-1">{errors.sa_id.message}</p>}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={closemodal}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white transition font-medium"
            >
              Annuler
            </button>
            {isBtnLoader ? (
              <ThreeDots
                height="20"
                width="50"
                color="white"
                radius="9"
                visible={true}
                ariaLabel="loading"
              />
            ) : (
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#895256] text-white hover:bg-[#733935] transition font-semibold"
              >
                Valider
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Statutupdatesalle
