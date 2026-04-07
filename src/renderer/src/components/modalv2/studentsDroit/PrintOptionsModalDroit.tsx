import React from 'react'
import { LuPrinter } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'

interface PrintOptionsModalDroitProps {
  closemodal: () => void
  onPrint: () => void
  yearSelected: string
  monthSelected: string
  statusSelected: string // Complet | Incomplet | Tous
  
}

const PrintOptionsModalDroit: React.FC<PrintOptionsModalDroitProps> = ({
  closemodal,
  onPrint,
  
  yearSelected,
  monthSelected,
  statusSelected
}) => {
  const isPrintAllowed = statusSelected === '2' && yearSelected !== '0'

  const handlePrintClick = () => {
    if (!isPrintAllowed) return
    onPrint()
    closemodal()
  }

  const displayStatus =
    statusSelected === '1' ? 'Payé' : statusSelected === '2' ? 'Non Payé' : '__'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Confirmation d’impression</h2>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <MdClose size={26} />
          </button>
        </div>

        {/* Body */}
        <div className="mb-6 text-gray-700">
          <p className="mb-4 text-gray-800">
            Vous êtes sur le point d’imprimer la liste des élèves selon le statut de Droit.
          </p>

          <div className="grid grid-cols-2 gap-4 text-center  mb-4">
            <div className="bg-[#F0E5FF] text-[#5B2E7D] font-semibold py-2 px-3 rounded-lg shadow-sm">
              Année <br />{' '}
              <span className="text-lg">{yearSelected !== '0' ? yearSelected : '—'}</span>
            </div>
            <div
              className={`font-semibold py-2 px-3 rounded-lg shadow-sm ${
                displayStatus === 'Payé'
                  ? 'bg-green-100 text-green-800'
                  : displayStatus === 'Non Payé'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              Statut <br /> <span className="text-lg">{displayStatus}</span>
            </div>
          </div>

          {!isPrintAllowed && (
            <p className="mt-4 text-red-600 font-semibold text-center">
              ⚠ Impression impossible :{' '}
              {yearSelected === '0'
                ? 'Veuillez sélectionner une année scolaire.'
                
                  : 'Seuls les élèves ayant droit non payé peuvent être imprimés.'}
            </p>
          )}
        </div>

        <button
          onClick={handlePrintClick}
          disabled={!isPrintAllowed}
          className={`w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold shadow-lg transition ${
            isPrintAllowed
              ? 'bg-[#895256] text-white hover:bg-[#733935] transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <LuPrinter size={20} /> Imprimer maintenant
        </button>
      </div>
    </div>
  )
}

export default PrintOptionsModalDroit
