import { FiUser, FiX } from 'react-icons/fi'
import { StudentsType } from '@renderer/types/Alltypes'
import profilesary from '../../images/test.png'
import { useState } from 'react'
import Statutupdateclasse from '../childmodal/Statutupdateclasse'
import { set } from 'react-hook-form'

type ShowInfoStudentsProps = {
  closemodal: () => void
  student: StudentsType
}

const Showinfostudentsmodal = ({ closemodal, student }: ShowInfoStudentsProps) => {
  const [statusBtnClicked, setStatusBtnClicked] = useState<string | null>(null)
  const [openClassModal, setOpenClassModal] = useState(false)
  const [TabStatusWhoAreValide, setTabStatusWhoAreValide] = useState<number[]>([])
  const [currentStatusIndex, setCurrentStatusIndex] = useState<number | null>(null) 

 const handleStatusBtnClick = (statut: string, index: number) => {
   setStatusBtnClicked(statut)
   setCurrentStatusIndex(index)
   setOpenClassModal(true)
 }

   const handleCloseChildModal = () => {
     setOpenClassModal(false)
     setStatusBtnClicked(null)
     setCurrentStatusIndex(null)
   }

   const handleStatusValidated = (statut: string, index: number) => {
     setTabStatusWhoAreValide((prev) => [...prev, index])
     handleCloseChildModal()
   }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-h-[32rem] max-w-6xl overflow-hidden flex relative">
        <button
          onClick={closemodal}
          className="absolute top-4 right-6 rounded-lg p-1 text-gray-600 hover:text-red-600 hover:scale-105 transition-transform"
          aria-label="Fermer"
        >
          <FiX size={20} />
        </button>

        {/* section gauche-profil */}
        <div className="w-1/3 bg-[#895256] text-white flex flex-col items-center justify-center p-8">
          {student.photo ? (
            <img
              src={student.photo}
              alt="Profil"
              className="w-40 h-40 object-cover rounded-full border-4 border-white mb-6 shadow-md"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center rounded-full bg-[#6b4a52] border-4 border-white mb-10 shadow-lg">
              <FiUser className="text-white text-[7rem]" />
            </div>
          )}
          <h2 className="text-2xl font-semibold text-center">
            {student.nom} {student.prenom}
          </h2>
          <p className="mt-1 text-sm italic opacity-90">
            {student.classe} - {student.annee}
          </p>
          <p className="text-sm mt-1 opacity-80">
            Matricule : <span className="font-medium">{student.matricule || 'N/A'}</span>
          </p>
        </div>

        {/* section droite-infos jiaby */}
        <div className="w-2/3 p-10 space-y-8 overflow-y-auto max-h-[90vh] text-gray-800">
          {/* IG */}
          <section>
            <h3 className="text-xl font-bold text-[#895256] mb-4 border-b pb-1 border-gray-300">
              Informations générales
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base">
              <p>
                <span className="font-medium">Sexe :</span> {student.sexe}
              </p>
              {student.date_naissance && (
                <p>
                  <span className="font-medium">Date de naissance :</span> {student.date_naissance}
                </p>
              )}
              {student.lieu_naissance && (
                <p>
                  <span className="font-medium">Lieu de naissance :</span> {student.lieu_naissance}
                </p>
              )}
              {student.adresse && (
                <p>
                  <span className="font-medium">Adresse :</span> {student.adresse}
                </p>
              )}
              {student.ecole_prec && (
                <p>
                  <span className="font-medium">École précédente :</span> {student.ecole_prec}
                </p>
              )}
            </div>
          </section>

          {/* Parents */}
          {(student.nom_pere || student.nom_mere) && (
            <section>
              <h3 className="text-xl font-bold text-[#895256] mb-4 border-b pb-1 border-gray-300">
                Informations parentales
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base">
                {student.nom_pere && (
                  <p>
                    <span className="font-medium">Nom du père :</span> {student.nom_pere}
                  </p>
                )}
                {student.prenom_pere && (
                  <p>
                    <span className="font-medium">Prénom du père :</span> {student.prenom_pere}
                  </p>
                )}
                {student.tel_pere && (
                  <p>
                    <span className="font-medium">Téléphone du père :</span> {student.tel_pere}
                  </p>
                )}
                {student.nom_mere && (
                  <p>
                    <span className="font-medium">Nom de la mère :</span> {student.nom_mere}
                  </p>
                )}
                {student.prenom_mere && (
                  <p>
                    <span className="font-medium">Prénom de la mère :</span> {student.prenom_mere}
                  </p>
                )}
                {student.tel_mere && (
                  <p>
                    <span className="font-medium">Téléphone de la mère :</span> {student.tel_mere}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Tuteur */}
          {(student.nom_tuteur || student.tel_tuteur) && (
            <section>
              <h3 className="text-xl font-bold text-[#895256] mb-4 border-b pb-1 border-gray-300">
                Tuteur légal
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base">
                {student.nom_tuteur && (
                  <p>
                    <span className="font-medium">Nom du tuteur :</span> {student.nom_tuteur}
                  </p>
                )}
                {student.prenom_tuteur && (
                  <p>
                    <span className="font-medium">Prénom du tuteur :</span> {student.prenom_tuteur}
                  </p>
                )}
                {student.tel_tuteur && (
                  <p>
                    <span className="font-medium">Téléphone du tuteur :</span> {student.tel_tuteur}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Statuts */}
          <section>
            <h3 className="text-xl font-bold text-[#895256] mb-4 border-b pb-1 border-gray-300">
              Historique des statuts
            </h3>

            {student.historiqueStatus && student.historiqueStatus.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-[#895256]">
                    <tr>
                      {['Année', 'Classe', 'Moyenne', 'Statut'].map((titleStat) => (
                        <th
                          key={titleStat}
                          className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                        >
                          {titleStat}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {student.historiqueStatus.map((status, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#faf7f2] transition-colors cursor-default"
                      >
                        <td className="px-4 py-3  text-gray-800 font-medium">
                          {status.annee_status}
                        </td>
                        <td className="px-4 py-3  text-gray-700">{status.classe}</td>
                        <td className="px-4 py-3  text-gray-700">
                          {status?.Moyenne_status ? status.Moyenne_status : ' en cours ...'}
                        </td>
                        <td className="px-4 py-3 ">
                          <button
                            onClick={() =>
                              status.statut &&
                              !TabStatusWhoAreValide.includes(index) &&
                              handleStatusBtnClick(status.statut, index)
                            }
                            disabled={status.statut ? TabStatusWhoAreValide.includes(index) : false}
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                              status.statut? TabStatusWhoAreValide.includes(index)  ? 'bg-gray-400 cursor-not-allowed' : status.statut.toLowerCase() === 'admis' ? 'bg-green-500': status.statut.toLowerCase() === 'redoublé' ? 'bg-red-500' : 'bg-gray-400' : 'bg-gray-400' }`}
                          >
                            {status.statut
                              ? status.statut.charAt(0).toUpperCase() + status.statut.slice(1)
                              : 'en cours...'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 italic">
                Aucun historique de statut disponible.
              </p>
            )}
          </section>
        </div>
      </div>
      {statusBtnClicked && currentStatusIndex !== null && (
        <Statutupdateclasse
          closemodal={handleCloseChildModal}
          statut={statusBtnClicked.toLowerCase() as 'admis' | 'redoublé'}
          onValidated={(statut) => handleStatusValidated(statut, currentStatusIndex)}
        />
      )}
    </div>
  )
}

export default Showinfostudentsmodal
