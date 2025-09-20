import { FaCheckCircle, FaTimesCircle, FaWallet, FaCalendarAlt, FaSchool } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { StudentsType, EcolageType } from '@renderer/types/Alltypes'
import { Monthlistedata } from '@renderer/data/Monthlistedata'

type ShowInfoStudentsProps = {
  closemodal: () => void
  student: StudentsType
}

const Showinfoecolagemodal = ({ closemodal, student }: ShowInfoStudentsProps) => {
  // Associer chaque mois de l'année avec l'écolage de l'élève
  const dataEcolage: EcolageType[] = Monthlistedata.map((mois) => {
    const found = student.ecolage?.find((e) => e.mois === mois.name)
    return {
      mois: mois.name,
      statusecolage: found?.statusecolage || 'Incomplet',
      montant: found?.montant || 0,
      datePaiement: found?.datePaiement || ''
    }
  })

  const eleveNom = `${student.prenom} ${student.nom}`
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-6xl p-6 rounded-3xl shadow-2xl relative">
        <button
          onClick={closemodal}
          className="absolute top-4 right-6 rounded-lg p-1 text-gray-600 hover:text-red-600 hover:scale-105 transition-transform"
          aria-label="Fermer"
        >
          <FiX size={20} />
        </button>

*        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{eleveNom}</h2>
          <p className="text-gray-600 flex justify-center items-center gap-2 mt-1 text-sm">
            <FaSchool className="text-[#895256]" /> {student.salle} - Année {student.annee}
          </p>
          <h3 className="text-xl font-semibold text-[#895256] mt-2">Paiements d'écolage</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {dataEcolage.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-md transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-700">{item.mois}</h4>
                {item.statusecolage === 'Complet' ? (
                  <FaCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-lg" />
                )}
              </div>

              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <FaWallet className="text-[#895256]" />
                  <span>{item.montant.toLocaleString()} Ar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <FaCalendarAlt className="text-[#895256]" />
                  <span>{item.datePaiement || 'Non payé'}</span>
                </div>
              </div>

              <span
                className={`mt-3 px-3 py-1 text-sm font-semibold rounded-full text-white text-center ${
                  item.statusecolage === 'Complet' ? 'bg-green-600' : 'bg-gray-400'
                }`}
              >
                {item.statusecolage}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Showinfoecolagemodal
