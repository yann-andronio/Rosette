import React, { useEffect, useRef, useState } from 'react'
import { FiX, FiAlertTriangle, FiTrash2, FiCheck } from 'react-icons/fi'
import { ThreeDots } from 'react-loader-spinner'
import { motion, AnimatePresence } from 'framer-motion'

type ConfirmDeleteModalProps = {
  closemodal: () => void
  onConfirm: (motif?: string) => Promise<void>
  isDeletingLoader?: boolean
  title?: string
  message?: string
  withReason?: boolean
  /** 'danger' = bouton rouge (suppression), 'confirm' = bouton vert (validation) */
  variant?: 'danger' | 'confirm'
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  closemodal,
  onConfirm,
  isDeletingLoader = false,
  title = 'Confirmation de suppression',
  message = 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  withReason = false,
  variant = 'danger'
}) => {
  const [motif, setMotif] = useState('')
  const confirmBtnRef = useRef<HTMLButtonElement>(null)
  const cancelBtnRef  = useRef<HTMLButtonElement>(null)

  /* Focus trap — met le focus sur Annuler à l'ouverture */
  useEffect(() => {
    cancelBtnRef.current?.focus()
  }, [])

  /* Fermeture au clavier Echap */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeletingLoader) closemodal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isDeletingLoader, closemodal])

  const btnClass =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-400'
      : 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-400'

  const iconVariant = variant === 'danger' ? FiTrash2 : FiCheck
  const IconComponent = iconVariant

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget && !isDeletingLoader) closemodal() }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[42rem] p-8"
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{   scale: 0.92, opacity: 0, y: 8  }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${variant === 'danger' ? 'bg-red-50' : 'bg-green-50'}`}>
                <FiAlertTriangle
                  size={22}
                  className={variant === 'danger' ? 'text-red-500' : 'text-green-500'}
                />
              </div>
              <h2
                id="confirm-modal-title"
                className="text-xl font-semibold text-gray-800"
              >
                {title}
              </h2>
            </div>
            <button
              onClick={closemodal}
              disabled={isDeletingLoader}
              aria-label="Fermer la boîte de dialogue"
              className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-40"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Message */}
          <p className="mb-6 text-gray-600 text-base leading-relaxed">{message}</p>

          {/* Motif optionnel */}
          {withReason && (
            <div className="mb-6">
              <label
                htmlFor="confirm-motif"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Motif <span className="text-red-500">*</span>
              </label>
              <textarea
                id="confirm-motif"
                value={motif}
                onChange={(e) => setMotif(e.target.value)}
                placeholder="Entrez le motif..."
                rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#895256] resize-none transition"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              ref={cancelBtnRef}
              onClick={closemodal}
              disabled={isDeletingLoader}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              ref={confirmBtnRef}
              onClick={() => onConfirm(motif)}
              disabled={isDeletingLoader}
              className={`px-6 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${btnClass}`}
            >
              {isDeletingLoader ? (
                <ThreeDots height="20" width="44" color="white" radius="9" visible />
              ) : (
                <>
                  <IconComponent size={16} />
                  {variant === 'danger' ? 'Supprimer' : 'Confirmer'}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ConfirmDeleteModal

