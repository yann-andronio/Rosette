
import { axiosRequest } from '@renderer/config/helpers'
import React, { useEffect, useState } from 'react'


import { FiX } from 'react-icons/fi'
// import { toast } from 'react-toastify'

type PaymentTypeModalProps = {
  closemodal: () => void
  onConfirm: (type: string, montant: number) => void
  mois: string
  montant: number,
  selectedType:string,
  setSelectedType:(type:string) =>void

  student: any,
  id:any,
  pay:any,
  reste:any

  // student:any,
  // fresh:(boolean) => void
  // reload:boolean
  // up:boolean,
  // setUp: (boolean) => void,
  // id:number
}

const PaymentTypeModalecolage: React.FC<PaymentTypeModalProps> = ({
  closemodal,
  onConfirm,
  mois,
  montant,
  selectedType,

  setSelectedType,
  pay,
  id,
  reste

  // fresh, 
  // reload,
  // student,
  // up,
  // setUp,
  // id
}) => {
  // const [selectedType, setSelectedType] = useState<string>('Complet')
  const [customAmount, setCustomAmount] = useState<number>(montant)

  const paymentTypes = ['Complet', 'Avance', 'Remboursement']

  //  const pay = async () => {
  //   try {
  //     await axiosRequest(
  //       'PUT',
  //       `ecolage-pay/${id}`,
  //       {
  //         cost: montant,
    
  //         eleve: student.nom,
  //         classe: student.sousetudiants[student.sousetudiants.length - 1].classe.nom_classe,
  //         salle: student.sousetudiants[student.sousetudiants.length - 1].salle.nom_salle,
  //         annee: student.sousetudiants[student.sousetudiants.length - 1].annee.annee,
  //         ac_id: student.sousetudiants[student.sousetudiants.length - 1].annee.id,
  //         prof: student.enfantProf,
  //         type: selectedType.toLowerCase()
  //       },
  //       'token'
  //     )
  //       .then(({ data }) => toast.success(data?.message))
  //       .then(() => fresh(!reload))
  //       // .then(() => closemodal())
  //       .then(() => setUp(!up))
  //     // .catch(error => console.log(error))
  //   } catch (error) {
  //     console.log('Le serveur ne repond pas')
  //   }
  // }


    const [ecoinfo, setEcoinfo] = useState<{ payé: number }>({
    payé: pay
  })

  const getEcoInfo = async () => {
    await axiosRequest(
      'GET',
      `ecoinfo/${id}`,
      null,
      'token'
    ).then(({ data }) => setEcoinfo(data))
  }

    let payed = pay
useEffect(() => {
    getEcoInfo()
    payed = ecoinfo.payé == 1
  }, [])

  

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in scale-95 transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-[#212529]">Choisir le type de paiement</h2>
          <button
            onClick={closemodal}
            className="text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Fermer"
          >
            <FiX size={24} />
          </button>
        </div>

        
        <p className="mb-5 text-gray-600 text-base">
          Mois : <span className="font-semibold text-[#212529]">{mois}</span>
        </p>
         <p className="mb-5 text-gray-600 text-base">
          Reste à payer : <span className="font-semibold text-[#212529]">{reste} Ar</span>
        </p>


  
        <div className="flex flex-col gap-3 mb-5">
          {paymentTypes.map((type) => (
            <button
            
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl border-2 font-medium text-lg transition-all
                ${
                  selectedType === type
                    ? 'border-[#895256] bg-[#895256] text-white shadow-md'
                    : 'border-gray-300 bg-gray-50 text-[#212529] hover:border-[#895256] hover:bg-[#fff4e6]'
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Montant */}
        <div className="mb-6">
          <label className="block text-[#212529] font-semibold mb-2">Montant (Ar)</label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#895256] text-[#212529] font-medium placeholder-gray-400"
          />
        </div>

        {/* Bouton confirmer */}
        <button
          disabled={payed && selectedType !='Remboursement' }
          onClick={() => onConfirm(selectedType, customAmount)}
          className={`w-full py-3 ${payed && selectedType != 'Remboursement' ? 'cursor-not-allowed bg-gray-500' : 'bg-[#895256] hover:bg-[#733935]'}  text-white font-semibold rounded-xl  transition-all shadow-md flex justify-center items-center gap-2`}
        >
          Confirmer le paiement
        </button>
      </div>
    </div>
  )
}

export default PaymentTypeModalecolage
