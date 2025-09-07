import { FC } from 'react'
import { FaUserCircle, FaBuilding, FaChalkboardTeacher, FaMapMarkerAlt } from 'react-icons/fa'
import {
  MdOutlineMail,
  MdPhoneIphone,
  MdOutlineLocationOn,
  MdOutlineAttachMoney
} from 'react-icons/md'
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs'
import { EmployerType } from '@renderer/types/Alltypes'

interface EmployerCardProps {
  employer: EmployerType
}

const EmployerCard: FC<EmployerCardProps> = ({ employer }) => {
  const getGenderIcon = (sexe: string) => {
    if (sexe === 'Homme') return <BsGenderMale className="text-lg text-[#895256]" />
    if (sexe === 'Femme') return <BsGenderFemale className="text-lg text-[#895256]" />
    return null
  }

 const getFunctionIcon = (fonction: string) => {
   switch (fonction) {
     case 'Professeur':
       return <FaChalkboardTeacher className="text-lg text-[#895256]" />
     default:
       return <FaBuilding className="text-lg text-[#895256]" />
   }
 }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform-gpu border border-gray-100 cursor-pointer max-w-md">
     
      <div className="flex items-center gap-5 pb-5 border-b border-gray-200">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ">
          {employer.photo ? (
            <img
              src={employer.photo}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-5xl text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {employer.nom} {employer.prenom}
          </h3>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            {getFunctionIcon(employer.fonction)}
            <span className="font-medium">{employer.fonction}</span>
            <span className="text-green-500 font-bold ml-2">• {employer.statut}</span>
          </p>
        </div>
      </div>

     
      <div className="mt-5 space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <MdOutlineMail className="text-lg text-[#895256] flex-shrink-0" />
          <span className="font-semibold">Email:</span> {employer.email}
        </div>
        <div className="flex items-center gap-3">
          <MdPhoneIphone className="text-lg text-[#895256] flex-shrink-0" />
          <span className="font-semibold">Téléphone:</span> {employer.tel}
        </div>
        <div className="flex items-center gap-3">
          <MdOutlineLocationOn className="text-lg text-[#895256] flex-shrink-0" />
          <span className="font-semibold">Adresse:</span> {employer.adresse}
        </div>
      </div>

      <div className="mt-5 space-y-3 pt-5 border-t border-gray-200 text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <MdOutlineAttachMoney className="text-lg text-[#895256] flex-shrink-0" />
          <span className="font-semibold">Salaire:</span> {employer.salaire} Ar
        </div>
        <div className="flex items-center gap-3">
          {getGenderIcon(employer.sexe)}
          <span className="font-semibold">Sexe:</span> {employer.sexe}
        </div>
      </div>

      
      {employer.fonction === 'Professeur' &&
        employer.matieresSalles &&
        employer.matieresSalles.length > 0 && (
          <div className="mt-5 pt-5 border-t border-gray-200 text-sm">
            <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-2">
              <FaChalkboardTeacher className="text-xl text-[#895256] flex-shrink-0" /> Matières &
              Salles
            </h4>
            <ul className="space-y-2 text-gray-700">
              {employer.matieresSalles.map((ms, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <FaMapMarkerAlt className="text-sm text-[#895256] flex-shrink-0" />
                  <span className="font-medium">{ms.matiere}</span>
                  <span className="text-gray-500">en salle {ms.salle}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  )
}

export default EmployerCard
