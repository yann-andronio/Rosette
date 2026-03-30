import React, { useState } from 'react'
import { FiX, FiAlertTriangle, FiTrash2, FiCheck } from 'react-icons/fi'
import { ThreeDots } from 'react-loader-spinner'

type ConfirmDeleteModalProps = {
  closemodal: () => void
  onConfirm: (motif?: string) => Promise<void>
  isDeletingLoader?: boolean
  title?: string
  message?: string
  withReason?: boolean
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  closemodal,
  onConfirm,
  isDeletingLoader = false,
  title = 'Confirmation de suppression',
  message = 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  withReason = false
}) => {

  // const isSuspension = title === 'Confirmation de suspension' || "Confirmation de Payement de salaire"
  // const buttonColor = isSuspension? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
  // const buttonIcon = isSuspension ? FiCheck : FiTrash2
  // const ButtonText = isSuspension ? 'Confirmer' : 'Supprimer'
  // const IconComponent = buttonIcon
  const [motif, setMotif] = useState('')
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[45rem] p-8 animate-fade-in scale-95 transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiAlertTriangle className="text-yellow-500 text-2xl" />
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          </div>
          <button
            onClick={closemodal}
            className="text-gray-400 hover:text-red-600 transition-all"
            disabled={isDeletingLoader}
          >
            <FiX size={24} />
          </button>
        </div>
        {withReason && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Motif</label>
            <textarea
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Entrez le motif..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#895256]"
            />
          </div>
        )}

        <p className="mb-8 text-gray-700 text-lg leading-relaxed">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={closemodal}
            disabled={isDeletingLoader}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
          <button
            onClick={() => onConfirm(motif)}
            disabled={isDeletingLoader}
            className={`px-6 py-2 rounded-lg text-white transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700`}
          >
            {isDeletingLoader ? (
              <ThreeDots
                height="20"
                width="50"
                color="white"
                radius="9"
                visible={true}
                ariaLabel="loading"
              />
            ) : (
              <>
                <FiCheck size={18} />
                Confirmer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
