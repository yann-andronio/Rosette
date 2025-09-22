import { FaCheckCircle, FaTimesCircle, FaWallet, FaCalendarAlt, FaSchool } from 'react-icons/fa'


import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'
import { FiX } from 'react-icons/fi'
import { axiosRequest } from "@renderer/config/helpers";


type ShowInfoStudentsProps = {
  closemodal: () => void
  student: Etudiant
  fresh:(boolean) => void
  reload:boolean
}

const Showinfoecolagemodal = ({ closemodal, student, fresh, reload }: ShowInfoStudentsProps) => {


  const eleveNom = `${student.prenom} ${student.nom}`
const pay = async (id:number, cost:number) => {
    try{
      await axiosRequest('PUT', `ecolage-pay/${id}`, {cost:cost, eleve: eleveNom, classe:student.sousetudiants[student.sousetudiants.length -1].classe.nom_classe, salle:student.sousetudiants[student.sousetudiants.length -1].salle.nom_salle, annee:student.sousetudiants[student.sousetudiants.length -1].annee.annee, ac_id:student.sousetudiants[student.sousetudiants.length -1].annee.id, prof:student.enfantProf}, 'token')
        .then(({data}) => console.log(data?.message))
        .then(() => fresh(!reload))
        .then(() => closemodal())
        // .catch(error => console.log(error))
    }catch (error){
      console.log('Le serveur ne repond pas')
    }
}

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

       <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{eleveNom}</h2>
          <p className="text-gray-600 flex justify-center items-center gap-2 mt-1 text-sm">
            <FaSchool className="text-[#895256]" /> {student.sousetudiants[student.sousetudiants.length - 1]?.salle.nom_salle} - Année {student.sousetudiants[student.sousetudiants.length - 1]?.annee.annee}
          </p>
          <h3 className="text-xl font-semibold text-[#895256] mt-2">Paiements d'écolage</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {student.sousetudiants[student.sousetudiants.length -1].ecolage.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-md transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-700">{item.mois}</h4>
                {item.payé === 1 ? (
                  <FaCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-lg" />
                )}
              </div>

              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <FaWallet className="text-[#895256]" />
                  <span>{student.sousetudiants[student.sousetudiants.length -1]?.classe?.ecolage?.toLocaleString()} Ar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <FaCalendarAlt className="text-[#895256]" />
                  <span>{item.payé==1?item.updated_at:'Non payé'}</span>
                </div>
              </div>
              {item.payé?<span
                className={`mt-3 px-3 py-1 text-sm font-semibold rounded-full text-white  text-center ${
                  item.payé === 1 ? 'bg-green-600 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-700 cursor-pointer'
                }`}
              >
                {item.payé==1?"Payé":"Non Payé"}
              </span>:<span
                onClick={() => pay(item.id, student.sousetudiants[student.sousetudiants.length -1]?.classe?.ecolage)}
                className={`mt-3 px-3 py-1 text-sm font-semibold rounded-full text-white  text-center ${
                  item.payé === 1 ? 'bg-green-600 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-700 cursor-pointer'
                }`}
              >
                {item.payé==1?"Payé":"Non Payé"}
              </span>}

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Showinfoecolagemodal
