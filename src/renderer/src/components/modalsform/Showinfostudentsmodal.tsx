import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'

import { FiPrinter, FiSlash, FiUser, FiX } from 'react-icons/fi'
import { useState } from 'react'
import Statutupdateclasse from '../childmodal/Statutupdatesalle'
import CertScolaire from '../certificats/CertScolaire'
import { axiosRequest } from '@renderer/config/helpers'
import useMultiModals from '@renderer/hooks/useMultiModals'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import {toast} from "react-toastify"
import { FaDoorOpen, FaXRay } from 'react-icons/fa'
import { Footprints } from 'lucide-react'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { motion } from 'framer-motion'

type ShowInfoStudentsProps = {
  closemodal: () => void
  student: Etudiant
  fresh: boolean
  setFresh: (fresh: boolean) => void
  hideActions?: boolean
}

const Showinfostudentsmodal = ({
  closemodal,
  student,
  fresh,
  setFresh,
  hideActions = false
}: ShowInfoStudentsProps) => {
  const [statusBtnClicked, setStatusBtnClicked] = useState<string | null>(null)
  const [openClassModal, setOpenClassModal] = useState(false)
  const [TabStatusWhoAreValide, setTabStatusWhoAreValide] = useState<number[]>([])
  const [currentStatusIndex, setCurrentStatusIndex] = useState<number | null>(null)
  const [setId, setSetId] = useState<number>()
  const [etId, setEtId] = useState<number>()
 

  const [issuspendreLoader, setIsDeletingLoader] = useState(false)
  const [studentToSuspendId, setStudentToSuspendId] = useState<{
    id: number | null
    route: string
  } | null>(null)
  const { openModal, modal, closModal } = useMultiModals()
  const [actionType, setActionType] = useState<'suspendre' | 'quitte' | 'renvoyer' | null>(null)

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

  const handlePrint = () => {
    const printContents = document.getElementById('certificat-a-imprimer')?.innerHTML
    if (!printContents) return
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
    window.location.reload() // miverigna mi reactualiser page
  }

  const suspendre = async (id: number, route: string) => {
    setIsDeletingLoader(true)
    try {
      await axiosRequest('PUT', `etudiant-${route}/${id}`, null, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setFresh(!fresh))
        .then(() => closemodal())
        .catch((err) => console.log(err?.response?.data?.error))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    } finally {
      setIsDeletingLoader(false)
    }
  }

  const handleOpenSuspendModal = () => {
    const currentStatus =
      student?.sousetudiants[student?.sousetudiants?.length - 1]?.status_admissions
    //  if (currentStatus !== 'suspendu') {
    setStudentToSuspendId({
      id: student.id,
      route: currentStatus == 'suspendu' ? 'desuspendre' : 'suspendre'
    })
    setActionType('suspendre')
    openModal('confirmSuspend')
    //  }
  }
  const handleQuitModal = () => {
    setActionType('quitte')
    openModal('confirmSuspend')
  }

  // const handleConfirmSuspend = async () => {
  //   if (studentToSuspendId !== null) {
  //     await suspendre(studentToSuspendId.id as number, studentToSuspendId.route)
  //   }
  // }
  const handleRenvoyeModal = () => {
    setActionType('renvoyer')
    openModal('confirmSuspend')
  }

  const handleConfirmAction = async (motif?: string) => {
    
    if (actionType === 'suspendre' && studentToSuspendId) {
      await suspendre(studentToSuspendId.id as number, studentToSuspendId.route)
    }

    if (actionType === 'quitte') {
      await quit(motif)
    }

    if (actionType === 'renvoyer') {
      await fired(motif)
    }

     closModal('confirmSuspend')
  }

  const quit = async (m) => {
    try {
      await axiosRequest('PUT', `etudiant-quit/${student.id}`, {motif:m}, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setFresh(!fresh))
        .then(() => closemodal())
        .catch((err) => toast.error(err.response.data.message))
    } catch (err) {
      console.log(err)
    }
  }

  const fired = async (m) => {
    try {
      await axiosRequest('PUT', `etudiant-fired/${student.id}`, {motif:m}, 'token')
        .then(({ data }) => toast.success(data.message))
        .then(() => setFresh(!fresh))
        .then(() => closemodal())
        .catch((err) => toast.error(err.response.data.message))
    } catch (err) {
      console.log(err)
    }
  }

  const [d, setD] = useState<string>(new Date().toISOString().split('T')[0])
const [openDateModal, setOpenDateModal] = useState(false)

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
              src={`${import.meta.env.VITE_BACKEND_URL}/storage/uploads/${student.photo}`}
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
          <p className="text-sm mt-1 opacity-80">
            Matricule : <span className="font-medium">{student.matricule || 'N/A'}</span>
          </p>
          <p className="mt-1 text-sm italic opacity-90">
            {student?.sousetudiants[student?.sousetudiants?.length - 1]?.salle?.nom_salle} -{' '}
            {student?.sousetudiants[student?.sousetudiants?.length - 1]?.annee?.annee}
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
                <span className="font-medium">Sexe :</span> {student.sexe == 1 ? 'Garçon' : 'Fille'}
              </p>

              {student.dateNaissance && (
                <p>
                  <span className="font-medium">Date de naissance :</span> {student.dateNaissance}
                </p>
              )}
              {student.lieuNaissance && (
                <p>
                  <span className="font-medium">Lieu de naissance :</span> {student.lieuNaissance}
                </p>
              )}
              {student.adresse && (
                <p>
                  <span className="font-medium">Adresse :</span> {student.adresse}
                </p>
              )}
              {student.ecole && (
                <p>
                  <span className="font-medium">École précédente :</span> {student.ecole}
                </p>
              )}

              <p>
                <span className="font-medium">enfant de prof :</span>{' '}
                {student.enfantProf == 1 ? 'Oui' : 'Non'}
              </p>
            </div>
          </section>

          {/* Parents */}
          {(student.nomPere || student.nomMere) && (
            <section>
              <h3 className="text-xl font-bold text-[#895256] mb-4 border-b pb-1 border-gray-300">
                Informations parentales
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base">
                {student.nomPere && (
                  <p>
                    <span className="font-medium">Nom du père :</span> {student.nomPere}
                  </p>
                )}
                {student.prenomPere && (
                  <p>
                    <span className="font-medium">Prénom du père :</span> {student.prenomPere}
                  </p>
                )}
                {student.telephonePere && (
                  <p>
                    <span className="font-medium">Téléphone du père :</span> {student.telephonePere}
                  </p>
                )}
                {student.nomMere && (
                  <p>
                    <span className="font-medium">Nom de la mère :</span> {student.nomMere}
                  </p>
                )}
                {student.prenomMere && (
                  <p>
                    <span className="font-medium">Prénom de la mère :</span> {student.prenomMere}
                  </p>
                )}
                {student.telephoneMere && (
                  <p>
                    <span className="font-medium">Téléphone de la mère :</span>{' '}
                    {student.telephoneMere}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Tuteur */}
          {(student.nomTuteur || student.telephoneTuteur) && (
            <section>
              <h3 className="text-xl font-bold text-[#895256] mb-4 border-b pb-1 border-gray-300">
                Tuteur légal
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base">
                {student.nomTuteur && (
                  <p>
                    <span className="font-medium">Nom du tuteur :</span> {student.nomTuteur}
                  </p>
                )}
                {student.prenomTuteur && (
                  <p>
                    <span className="font-medium">Prénom du tuteur :</span> {student.prenomTuteur}
                  </p>
                )}
                {student.telephoneTuteur && (
                  <p>
                    <span className="font-medium">Téléphone du tuteur :</span>{' '}
                    {student.telephoneTuteur}
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
            <div className="flex flex-wrap gap-3 mb-4">
              {/* btn Suspendre */}
              {!hideActions && (
                <>
                  <button
                    onClick={handleOpenSuspendModal}
                    type="button"
                    // disabled={
                    //   student?.sousetudiants[student?.sousetudiants?.length - 1]?.status_admissions ==
                    //   'suspendu'
                    // }
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                      student?.sousetudiants[student?.sousetudiants?.length - 1]
                        ?.status_admissions == 'suspendu'
                        ? 'bg-red-400 hover:bg-red-500 '
                        : 'bg-red-500 hover:bg-red-400'
                    } text-white text-sm font-medium transition cursor-pointer`}
                  >
                    <FiSlash size={16} />{' '}
                    {student?.sousetudiants[student?.sousetudiants?.length - 1]
                      ?.status_admissions == 'suspendu'
                      ? 'Desuspendre'
                      : 'Suspendre'}
                  </button>
                  <button
                    onClick={handleQuitModal}
                    type="button"
                    // disabled={
                    //   student?.sousetudiants[student?.sousetudiants?.length - 1]?.status_admissions ==
                    //   'suspendu'
                    // }
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                      student?.sousetudiants[student?.sousetudiants?.length - 1]
                        ?.status_admissions == 'suspendu'
                        ? 'bg-red-400 hover:bg-red-500 '
                        : 'bg-red-500 hover:bg-red-400'
                    } text-white text-sm font-medium transition cursor-pointer`}
                  >
                    <FaDoorOpen />
                    Marquer Quitté(e)
                  </button>
                  <button
                    onClick={handleRenvoyeModal}
                    type="button"
                    // disabled={
                    //   student?.sousetudiants[student?.sousetudiants?.length - 1]?.status_admissions ==
                    //   'suspendu'
                    // }
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                      student?.sousetudiants[student?.sousetudiants?.length - 1]
                        ?.status_admissions == 'suspendu'
                        ? 'bg-red-400 hover:bg-red-500 '
                        : 'bg-red-500 hover:bg-red-400'
                    } text-white text-sm font-medium transition cursor-pointer`}
                  >
                    <Footprints />
                    Renvoyer
                  </button>
                            <button
                type="button"
                onClick={() => setOpenDateModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#895256] hover:bg-[#733935] text-white text-sm font-medium transition"
              >
                <FiPrinter size={16} /> Imprimer Certificat
              </button>
                </>
              )}

              {/* btn Imprimer Certificat scolarité */}
    
            </div>

            {student.sousetudiants && student.sousetudiants.length > 0 ? (
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
                    {student?.sousetudiants?.map((status, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#faf7f2] transition-colors cursor-default"
                      >
                        <td className="px-4 py-3  text-gray-800 font-medium">
                          {status?.annee?.annee}
                        </td>
                        <td className="px-4 py-3  text-gray-700">{status?.classe?.nom_classe}</td>
                        <td className="px-4 py-3  text-gray-700">
                          {status?.noteTotal != null ? status?.noteTotal : ' en cours ...'}
                        </td>
                        <td className="px-4 py-3 ">
                          <button
                            onClick={() => {
                              if (status.status_admissions) {
                                handleStatusBtnClick(status.status_admissions, index)
                                setSetId(status.id)
                                setEtId(student.id)
                              }
                            }}
                            disabled={
                              status.status_admissions == 'cours' ||
                              status.status_admissions == 'suspendu' ||
                              status.transfert == 1
                                ? true
                                : false
                            }
                            className={`inline-block px-3 py-1  rounded-full text-xs font-semibold text-white ${status.transfert == 1 ? 'cursor-not-allowed' : ''} ${
                              status.status_admissions
                                ? status.status_admissions == 'cours'
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : status.status_admissions?.toLowerCase() === 'admis'
                                    ? 'bg-green-500'
                                    : status.status_admissions?.toLowerCase() === 'redoublé'
                                      ? 'bg-red-500'
                                      : 'bg-gray-400'
                                : 'bg-gray-400'
                            }`}
                          >
                            {status.status_admissions
                              ? status.status_admissions.charAt(0).toUpperCase() +
                                status.status_admissions?.slice(1)
                              : 'en cours...'}
                            {status?.by_delib == 1?<span className='text-red-600 ml-5'>Par Déliberation</span>:''}
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
          setid={setId}
          etid={etId}
          closemodal={handleCloseChildModal}
          statut={statusBtnClicked.toLowerCase() as 'admis' | 'redoublé'}
          onValidated={(statut) => handleStatusValidated(statut, currentStatusIndex)}
        />
      )}

      {modal.confirmSuspend && (
        <ConfirmDeleteModal
          title={
            actionType === 'suspendre'
              ? 'Confirmation de suspension'
              : actionType === 'quitte'
                ? 'Confirmation de départ'
                : 'Confirmation de renvoi'
          }
          message={`Voulez-vous continuer cette action pour ${student.nom} ${student.prenom} ?`}
          onConfirm={handleConfirmAction}
          closemodal={() => closModal('confirmSuspend')}
          isDeletingLoader={issuspendreLoader}
          withReason={true} 
        />
      )}

      {openDateModal && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-[#895256]">
        Sélectionner une date
      </h2>

      <input
        type="date"
        value={d}
        onChange={(e) => setD(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-4"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setOpenDateModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Annuler
        </button>

        <button
          onClick={() => {
            setOpenDateModal(false)
            handlePrint()
          }}
          className="px-4 py-2 rounded-lg bg-[#895256] text-white hover:bg-[#733935]"
        >
          Imprimer
        </button>
      </div>
    </div>
  </div>
)}

      {/* avony ato nle impression  */}
      <div className="hidden">
        <CertScolaire student={student} d={d}/>
      </div>
    </div>
  )
}

export default Showinfostudentsmodal
