import { forwardRef } from 'react'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'
import logo from '../../../images/logo.jpg'

interface PapierImpressionStudentsInfoProps {
  eleves: Etudiant[]
}

const PapierImpressionStudentsInfo = forwardRef<HTMLDivElement, PapierImpressionStudentsInfoProps>(
  ({ eleves }, ref) => {
    const dateDuJour = new Date().toLocaleDateString('fr-FR')

    return (
      <div ref={ref} className="p-6 bg-white text-gray-900 font-sans text-sm leading-relaxed">
        
        <div className="flex justify-between items-center border-b-2 border-[#895256] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-xl font-extrabold uppercase tracking-wider">LA ROSETTE</h1>
              <p className="text-xs text-gray-600">Établissement privé — Mananara</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p>
              Date d'impression : <span className="font-semibold">{dateDuJour}</span>
            </p>
            <p>
              Total élèves : <span className="font-bold text-[#895256]">{eleves.length}</span>
            </p>
          </div>
        </div>

        <h2 className="text-center text-lg font-bold mb-6 uppercase tracking-wide">
          Liste des élèves
        </h2>

       
        <table className="w-full border border-gray-400 border-collapse text-sm">
          <thead className="bg-[#895256] text-white">
            <tr>
              <th className="border border-gray-400 px-3 py-2 text-left">#</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Nom</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Prénom</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Sexe</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Classe</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Salle</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Matricule</th>
            </tr>
          </thead>
          <tbody>
            {eleves.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="border border-gray-400 px-3 py-3 text-center text-gray-500"
                >
                  Aucun élève trouvé.
                </td>
              </tr>
            ) : (
              eleves.map((student, index) => {
                const sous = student.sousetudiants[student.sousetudiants.length - 1]
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-400 px-3 py-1">{index + 1}</td>
                    <td className="border border-gray-400 px-3 py-1 font-semibold">
                      {student.nom}
                    </td>
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
                    <td className="border border-gray-400 px-3 py-1">{student.matricule ?? '-'}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

   
        <div className="mt-8 text-center text-xs text-gray-500 border-t pt-3">
          Document généré automatiquement — {dateDuJour}
        </div>
      </div>
    )
  }
)

export default PapierImpressionStudentsInfo
