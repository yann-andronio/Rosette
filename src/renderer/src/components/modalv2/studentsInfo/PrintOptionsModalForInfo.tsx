import React from 'react'
import { LuPrinter } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'

interface PrintOptionsModalForInfoProps {
  closemodal: () => void
  onPrint: () => void
  totalEleves: number
}

const PrintOptionsModalForInfo: React.FC<PrintOptionsModalForInfoProps> = ({
  closemodal,
  onPrint,
  totalEleves
}) => {
  const handlePrintClick = () => {
    onPrint()
    closemodal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Confirmation d'impression</h2>
          <button onClick={closemodal} className="text-gray-600 hover:text-red-600 transition">
            <MdClose size={26} />
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          Vous êtes sur le point d'imprimer la liste des élèves actuellement affichés.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 text-center mb-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Nombre d'élèves à imprimer</p>
          <p className="text-3xl font-bold text-[#895256] mt-1">{totalEleves}</p>
        </div>

        <button
          onClick={handlePrintClick}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold shadow-lg bg-[#895256] text-white hover:bg-[#733935] transition transform hover:scale-[1.02]"
        >
          <LuPrinter size={20} /> Imprimer maintenant
        </button>
      </div>
    </div>
  )
}

export default PrintOptionsModalForInfo
