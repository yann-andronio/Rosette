import { FC, useState } from 'react'
import { FaCalendarAlt, FaMoneyBillWave, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { MdWorkOff, MdVerifiedUser, MdOutlinePauseCircle } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { EmployerType } from '@renderer/types/Alltypes'

interface EmployerDetailsCardProps {
  employer: EmployerType
}

const EmployerDetailsCard: FC<EmployerDetailsCardProps> = ({ employer }) => {
  const [activeSection, setActiveSection] = useState<'salaires' | 'conges' | null>(null)

  const toggleSection = (section: 'salaires' | 'conges') => {
    setActiveSection(activeSection === section ? null : section)
  }

  const getStatusDisplay = (statut: string) => {
    switch (statut) {
      case "actif":
        return {
          text: 'text-green-600',
          bg: 'bg-green-100',
          icon: <MdVerifiedUser className="text-green-600 text-lg" />
        }
      case 'congé':
        return {
          text: 'text-yellow-600',
          bg: 'bg-yellow-100',
          icon: <MdWorkOff className="text-yellow-600 text-lg" />
        }

      case 'suspendu':
        return {
          text: 'text-red-600',
          bg: 'bg-red-100',
          icon: <MdOutlinePauseCircle className="text-red-600 text-lg" />
        }

      default:
        return { text: 'text-gray-600', bg: 'bg-gray-100', icon: null }
    }
  }



  const status = getStatusDisplay(employer.status)

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md w-full transition-all duration-300 hover:shadow-xl">
      {/* --- header --- */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {employer.nom} {employer.prenom}
          </h2>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}>
            {status.icon}
            <span className={`font-semibold text-xs ${status.text}`}>{employer.status}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{employer.profs.profession}</p>
      </div>

      <div className="p-6 space-y-4">
        {/* --- Bouton Historique des salaires --- */}
        <button
          onClick={() => toggleSection('salaires')}
          className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition duration-200 ${
            activeSection === 'salaires' ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-[#895256] text-lg" />
            <span className="font-bold text-gray-800 text-sm">Historique des Salaires</span>
          </div>
          {activeSection === 'salaires' ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </button>

        {/* --- Contenu Historique des salaires --- */}
        <AnimatePresence>
          {activeSection === 'salaires' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-2 max-h-[26vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {employer.salaires && employer.salaires.length > 0 ? (
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {employer.salaires.map((s, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow-sm transition"
                      >
                        <span className="font-medium text-gray-800">{s.mois}</span>
                        <span className="font-bold text-[#895256]">
                          {s.montant.toLocaleString('fr-FR')} Ar
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-3 bg-gray-50 rounded-lg text-gray-500 italic text-sm">
                    <p>Aucun salaire enregistré.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Bouton Historique des congés --- */}
        <button
          onClick={() => toggleSection('conges')}
          className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition duration-200 ${
            activeSection === 'conges' ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#895256] text-lg" />
            <span className="font-bold text-gray-800 text-sm">Historique des Congés</span>
          </div>
          {activeSection === 'conges' ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </button>

        {/* --- Contenu Historique des congés --- */}
        <AnimatePresence>
          {activeSection === 'conges' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-2 max-h-[26vh] overflow-y-auto   ">
                {employer.conges && employer.conges.length > 0 ? (
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {employer.conges.map((c, i) => (
                      <li
                        key={i}
                        className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow-sm transition"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">
                            Du {new Date(c.dateDebut).toLocaleDateString('fr-FR')} au{' '}
                            {new Date(c.dateFin).toLocaleDateString('fr-FR')}
                          </span>
                          {c.motif && (
                            <span className="text-xs italic text-gray-500 ml-2">{c.motif}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-3 bg-gray-50 rounded-lg text-gray-500 italic text-sm">
                    <p>Aucun congé enregistré.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EmployerDetailsCard
