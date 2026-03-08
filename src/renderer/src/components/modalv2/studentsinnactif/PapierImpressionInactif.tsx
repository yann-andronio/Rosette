import { forwardRef } from 'react'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'

interface PapierImpressionInactifProps {
  eleves: Etudiant[]
  yearSelected: string
  niveauSelected: string
  salleSelected: string
  sexeSelected: string
  statusSelected: string
}

const PapierImpressionInactif = forwardRef<HTMLDivElement, PapierImpressionInactifProps>(
  ({ eleves, yearSelected, niveauSelected, salleSelected, sexeSelected, statusSelected }, ref) => {
    return (
      <div ref={ref} className="p-8 bg-white text-gray-900 font-sans text-sm">

            <div className="text-center mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold mb-1">Liste des élèves inactifs</h1>

          <div className="text-gray-700 mt-2 space-x-3">
            <span>
              Année scolaire : <strong>{yearSelected !== '0' ? yearSelected : '—'}</strong>
            </span>

            <span>
              Niveau : <strong>{niveauSelected !== '0' ? niveauSelected : '—'}</strong>
            </span>

            <span>
              Salle : <strong>{salleSelected !== '0' ? salleSelected : '—'}</strong>
            </span>

            <span>
              Sexe :
              <strong>
                {sexeSelected === 'Homme'
                  ? ' Garçons'
                  : sexeSelected === 'Femme'
                    ? ' Filles'
                    : ' —'}
              </strong>
            </span>

            <span>
              Statut : <strong>{statusSelected !== '0' ? statusSelected : '—'}</strong>
            </span>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full border border-gray-400 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-400 px-2 py-1">#</th>
              <th className="border border-gray-400 px-2 py-1 text-left">Nom</th>
              <th className="border border-gray-400 px-2 py-1 text-left">Prénom</th>
              <th className="border border-gray-400 px-2 py-1 text-left">Sexe</th>
              <th className="border border-gray-400 px-2 py-1 text-left">Classe</th>
              <th className="border border-gray-400 px-2 py-1 text-left">Salle</th>
              <th className="border border-gray-400 px-2 py-1 text-left">Statut</th>
            </tr>
          </thead>

          <tbody>
            {eleves.length === 0 ? (
              <tr>
                <td colSpan={7} className="border border-gray-400 text-center py-3 text-gray-500">
                  Aucun élève inactif trouvé.
                </td>
              </tr>
            ) : (
              eleves.map((student, index) => {
                const sous = student.sousetudiants[student.sousetudiants.length - 1]

                const statut =
                  sous?.ecolage?.every((et) => et.payé == 1) === true ? 'Quitter' : 'Renvoyer'

                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-400 px-2 py-1 text-center">{index + 1}</td>

                    <td className="border border-gray-400 px-2 py-1">{student.nom}</td>

                    <td className="border border-gray-400 px-2 py-1">{student.prenom}</td>

                    <td className="border border-gray-400 px-2 py-1">
                      {student.sexe === 1 ? 'Garçon' : 'Fille'}
                    </td>

                    <td className="border border-gray-400 px-2 py-1">
                      {sous?.classe?.nom_classe ?? '-'}
                    </td>

                    <td className="border border-gray-400 px-2 py-1">
                      {sous?.salle?.nom_salle ?? '-'}
                    </td>

                    <td className="border border-gray-400 px-2 py-1">{statut}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        <div className="mt-6 text-right text-gray-600">
          Total élèves : <strong>{eleves.length}</strong>
        </div>
      </div>
    )
  }
)

export default PapierImpressionInactif
