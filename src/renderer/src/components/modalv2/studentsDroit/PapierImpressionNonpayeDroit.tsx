import { forwardRef } from 'react'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'

interface PapierImpressionNonpayeDroitProps {
  elevesNonPayes: Etudiant[]
  yearSelected: string
  monthSelected: string
}

const PapierImpressionNonpayeDroit = forwardRef<HTMLDivElement, PapierImpressionNonpayeDroitProps>(
  ({ elevesNonPayes, yearSelected, monthSelected }, ref) => {
    
    return (
      <div ref={ref} className="p-6 bg-white text-gray-900 font-sans text-sm leading-relaxed">
        <div className="mb-6 text-center border-b pb-3">
          <h1 className="text-2xl font-bold mb-1">Liste des élèves n’ayant pas payé de Droit</h1>
          <p className="text-gray-700">
            Année scolaire :{' '}
      
          </p>
        </div>

        <table className="w-full border border-gray-400 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-400 px-3 py-1 text-left">Nom</th>
              <th className="border border-gray-400 px-3 py-1 text-left">Prénom</th>
              <th className="border border-gray-400 px-3 py-1 text-left">Sexe</th>
              <th className="border border-gray-400 px-3 py-1 text-left">Classe</th>
              <th className="border border-gray-400 px-3 py-1 text-left">Salle</th>
            </tr>
          </thead>
          <tbody>
            {elevesNonPayes.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-400 px-3 py-2 text-center text-gray-500"
                >
                  Aucun élève non payé pour cette période.
                </td>
              </tr>
            ) : (
              elevesNonPayes.map((student, index) => {
                const sous = student.sousetudiants[student.sousetudiants.length - 1]
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-400 px-3 py-1">{student.nom}</td>
                    <td className="border border-gray-400 px-3 py-1">{student.prenom}</td>
                    <td className="border border-gray-400 px-3 py-1">
                      {student.sexe === 1 ? 'Garçon' : 'Fille'}
                    </td>
                    <td className="border border-gray-400 px-3 py-1">
                      {sous?.classe?.nom_classe ?? '-'}
                    </td>
                    <td className="border border-gray-400 px-3 py-1">
                      {sous?.salle?.nom_salle ?? '-'}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    )
  }
)

export default PapierImpressionNonpayeDroit
