import React from 'react'
import { FiX } from 'react-icons/fi'
import { formatDate } from '@renderer/utils/FormatDate'

type PaymentHistoryModalProps = {
  mois: string
  history: { type: string; montant: number; date: string }[]
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
            {history.map((h, idx) => (
              <li
                key={idx}
                className="flex justify-between p-2 border-b border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <span className="font-medium">{h.type}</span>
                <span>{h.montant.toLocaleString()} Ar</span>
                <span className="text-xs text-gray-400">{formatDate(h.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PaymentHistoryModal
