import React, {useState, useEffect} from 'react'
import { FiX } from 'react-icons/fi'
import { formatDate } from '@renderer/utils/FormatDate'

type PaymentHistoryModalProps = {
  mois: string
  history: { id: number; montant: number; type: string; reste: number; created_at: string }[]
  closeModal: () => void
}

const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({ mois, history, closeModal }) => {
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative animate-fade-in scale-95 transition-transform duration-300">
        <button
          onClick={closeModal}
          className="absolute top-4 right-6 text-gray-600 hover:text-red-600"
          aria-label="Fermer"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Historique de paiement - {mois}</h2>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center">Aucun paiement pour ce mois.</p>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {history.map((item, idx) => (
                        <li
                                 key={item.id}
                                 className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center hover:shadow-md transition"
                               >
                                 <div>
                                   <p className="font-semibold text-[#212529]">
                                     Montant : {item.montant.toLocaleString()} Ar
                                   </p>
                                   <p className="text-sm text-gray-500">Date : {formatDate(item.created_at)}</p>
                                   <p className="text-sm">
                                     Type : <span className="font-medium text-[#895256]">{item.type}</span>
                                   </p>
                                   <p
                                     className={`text-sm font-medium ${
                                       item.reste === 0 ? 'text-green-700' : 'text-red-700'
                                     }`}
                                   >
                                     {'Reste:' + item.reste + ' Ar'}
                                   </p>
                                   <p
                                     className={`text-sm font-medium ${
                                       item.reste === 0 ? 'text-green-700' : 'text-red-700'
                                     }`}
                                   >
                                     {item.reste == 0 ? 'Payé' : 'Non Payé'}
                                   </p>
                                 </div>
             
                                 <div className="flex gap-2">
                                   {/* <button className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition">
                                     <FiEdit size={18} />
                                   </button> */}
                                   <button
                                     onClick={() => {
                                      //  setSelectedPayment(item)
                                      //  handlePrintStudentRecue()
                                     }}
                                     title="Imprimer le reçu"
                                     className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                                   >
                                     {/* <LuPrinter size={20} /> */}
                                   </button>
                                   <button
                                     title="Supprimer l'historique"
                                     onClick={() => {
                                      //  setSelectedDeleteId(item.id)
                                      //  openModal('deleteHisto')
                                     }}
                                     className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                                   >
                                     {/* <FiTrash2 size={18} /> */}
                                   </button>
                                 </div>
                               </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PaymentHistoryModal
