import { FiUser, FiX } from 'react-icons/fi'
import { StudentsType } from '@renderer/types/Alltypes'

type ShowInfoStudentsProps = {
  closemodal: () => void
  student: StudentsType
}

const Showinfonotestudents = ({ closemodal, student }: ShowInfoStudentsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-4xl overflow-hidden flex relative">
        <button
          onClick={closemodal}
          className="absolute top-4 right-6 rounded-lg p-1 text-gray-600 hover:text-red-600 hover:scale-105 transition-transform"
          aria-label="Fermer"
        >
          <FiX size={20} />
        </button>

        {/* Section gauche - profil */}
        <div className="w-1/3 bg-[#895256] text-white flex flex-col items-center justify-center p-8">
          {student.photo ? (
            <img
              src={student.photo}
              alt="Profil"
              className="w-36 h-36 object-cover rounded-full border-4 border-white mb-6 shadow-md"
            />
          ) : (
            <div className="w-36 h-36 flex items-center justify-center rounded-full bg-[#6b4a52] border-4 border-white mb-6 shadow-lg">
              <FiUser className="text-white text-[6rem]" />
            </div>
          )}
          <h2 className="text-xl font-semibold text-center">
            {student.nom} {student.prenom}
          </h2>
          <p className="mt-1 text-sm italic opacity-90">{student.classe}</p>
        </div>

        {/* Section droite - Infos */}
        <div className="w-2/3 p-10 space-y-6 overflow-y-auto max-h-[90vh] text-gray-800">
          <h3 className="text-xl font-bold text-[#895256] mb-2 border-b pb-1 border-gray-300">
            Détails de l'élève
          </h3>

          <div className="grid grid-cols-2 gap-4 text-base">
            <p>
              <span className="font-medium">Nom :</span> {student.nom}
            </p>
            <p>
              <span className="font-medium">Prénom :</span> {student.prenom}
            </p>
            <p>
              <span className="font-medium">Classe :</span> {student.classe}
            </p>
            {student.trimestre1 && (
              <p>
                <span className="font-medium">Trimestre 1 :</span> {student.trimestre1}
              </p>
            )}
            {student.trimestre2 && (
              <p>
                <span className="font-medium">Trimestre 2 :</span> {student.trimestre2}
              </p>
            )}
            {student.trimestre3 && (
              <p>
                <span className="font-medium">Trimestre 3 :</span> {student.trimestre3}
              </p>
            )}
            {student.moyenne && (
              <p>
                <span className="font-medium">Moyenne Génerale :</span> {student.moyenne}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showinfonotestudents
