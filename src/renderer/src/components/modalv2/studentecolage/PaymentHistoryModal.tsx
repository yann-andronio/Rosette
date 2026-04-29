import React, { useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { formatDate } from '@renderer/utils/FormatDate'
import { LuPrinter } from 'react-icons/lu'
import { axiosRequest } from '@renderer/config/helpers'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import PrintHistoryEcolage from './PrintHistoryEcolage'
import ConfirmDeleteModal from '@renderer/components/modalsform/ConfirmDeleteModal'
import useMultiModals from '@renderer/hooks/useMultiModals'

type EcoleInfo = {
  name: string
  owner: string
  telephone: string
  email: string
  adresse: string
  decision: string
  code: string
}

type PaymentHistoryModalProps = {
  eleve: string
  classe: string
  salle: string
  numeroRecu?: string
  mois: string
  annee: string
  school: string
  ecoleInfo: EcoleInfo 
  history: { id: number; montant: number; type: string; reste: number; created_at: string }[]
  closeModal: () => void
  fresh: (val: boolean) => void
  reload: boolean
}

const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({
  mois,
  history: initialHistory,
  closeModal,
  eleve,
  classe,
  school,
  ecoleInfo,
  salle,
  numeroRecu,
  annee,
  fresh,
  reload
}) => {
  const [selectedHistoryPayement, setselectedHistoryPayement] = useState<any | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

 const handlePrint = (paiement: any) => {
   setselectedHistoryPayement(paiement)
   setTimeout(() => {
     if (!printRef.current) return
     const printContents = printRef.current.innerHTML
     const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
       .map((el) => el.outerHTML)
       .join('\n')

     // Supprimer l'ancienne iframe si elle existe
     const existingIframe = document.getElementById('print-iframe')
     if (existingIframe) existingIframe.remove()

     // Créer une iframe cachée
     const iframe = document.createElement('iframe')
     iframe.id = 'print-iframe'
     iframe.style.position = 'fixed'
     iframe.style.top = '-9999px'
     iframe.style.left = '-9999px'
     iframe.style.width = '0'
     iframe.style.height = '0'
     iframe.style.border = 'none'
     document.body.appendChild(iframe)

     const doc = iframe.contentDocument || iframe.contentWindow?.document
     if (!doc) return

     doc.open()
     doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          ${styles}
          <style>
            @page {
              margin-top: 2cm;
              margin-bottom: 1cm;
              margin-left: 1cm;
              margin-right: 1cm;
              size: A4;
            }
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `)
     doc.close()

     iframe.onload = () => {
       iframe.contentWindow?.focus()
       iframe.contentWindow?.print()
       setTimeout(() => iframe.remove(), 1000)
     }
   }, 200)
 }

  const { modal, openModal, closModal } = useMultiModals()
  const [localHistory, setLocalHistory] = useState(initialHistory)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleRequestDelete = (id: number) => {
    setSelectedId(id)
    openModal('confirmDelete')
  }

  const handleConfirmDelete = async () => {
    if (!selectedId) return
    setIsDeleting(true)
    try {
      await axiosRequest('DELETE', `ecohisto/${selectedId}`, null, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setLocalHistory((prev) => prev.filter((item) => item.id !== selectedId)))
        .then(() => fresh(!reload))
        .catch((err) => toast.error(err.response?.data?.message))
    } catch (error) {
      console.log('Le serveur ne répond pas')
    } finally {
      setIsDeleting(false)
      setSelectedId(null)
      closModal('confirmDelete')
    }
  }

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

        {localHistory.length === 0 ? (
          <p className="text-gray-500 text-center">Aucun paiement pour ce mois.</p>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {localHistory.map((item) => (
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
                    Type : <span className="font-medium text-[#895256]">{item.type=='rembourse'?'Remboursement':item.type}</span>
                  </p>
                  <p
                    className={`text-sm font-medium ${item.reste === 0 ? 'text-green-700' : 'text-red-700'}`}
                  >
                    {'Reste : ' + item.reste + ' Ar'}
                  </p>
                  <p
                    className={`text-sm font-medium ${item.reste === 0 ? 'text-green-700' : 'text-red-700'}`}
                  >
                    {item.reste == 0 ? 'Payé' : 'Non Payé'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handlePrint({
                        ...item,
                        eleve,
                        classe,
                        salle,
                        annee
                      })
                    }
                    title="Imprimer le reçu"
                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                  >
                    <LuPrinter size={20} />
                  </button>
                  <button
                    onClick={() => handleRequestDelete(item.id)}
                    title="Supprimer"
                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {modal.confirmDelete && (
        <ConfirmDeleteModal
          closemodal={() => closModal('confirmDelete')}
          onConfirm={handleConfirmDelete}
          isDeletingLoader={isDeleting}
          message="Êtes-vous sûr de vouloir supprimer cet historique ? Cette action est irréversible."
          title="Supprimer un historique"
        />
      )}

      {selectedHistoryPayement && (
        <div className="hidden">
          <PrintHistoryEcolage
            ref={printRef}
            school={school}
            ecoleInfo={ecoleInfo}
            mois={mois}
            paiement={selectedHistoryPayement}
          />
        </div>
      )}
    </div>
  )
}

export default PaymentHistoryModal
