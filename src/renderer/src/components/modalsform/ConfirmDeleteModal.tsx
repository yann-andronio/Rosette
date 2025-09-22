import React from 'react'
import { FiX, FiAlertTriangle } from 'react-icons/fi'

type ConfirmDeleteModalProps = {
  closemodal: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  closemodal,
  onConfirm,
  title = 'Confirmation de suppression',
  message = 'Êtes-vous sûr de vouloir supprimer cet élément ?'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiAlertTriangle className="text-yellow-500" /> {title}
          </h2>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <FiX size={20} />
          </button>
        </div>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={closemodal}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white transition font-medium"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm()
              closemodal()
            }}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
