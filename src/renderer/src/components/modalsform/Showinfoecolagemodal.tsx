import {
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
  FaCalendarAlt,
  FaSchool,
  FaPrint,
  FaInfoCircle
} from 'react-icons/fa'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'
import { FiX } from 'react-icons/fi'
import { axiosRequest } from '@renderer/config/helpers'
import { useRef, useState, useEffect } from 'react'
import Recuepayementecolage from '../recue/Recuepayementecolage'
import { toast } from 'react-toastify'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import useMultiModals from '@renderer/hooks/useMultiModals'
import { formatDate } from '../../utils/FormatDate'
import { RotatingLines } from 'react-loader-spinner'
import PaymentTypeModalecolage from '../modalv2/studentecolage/PaymentTypeModalecolage'
import PaymentHistoryModal from '../modalv2/studentecolage/PaymentHistoryModal'

type ShowInfoStudentsProps = {
  closemodal: () => void
  student: Etudiant
  fresh: (boolean) => void
  reload: boolean
}

type EcolageToConfirm = {
  id: number
  mois: string
  cost: number
  payé?: number | null
  reste?: number | null
}

type EcoleInfo = {
  name: string
  owner: string
  telephone: string
  email: string
  adresse: string
  decision: string
  code: string
}

const Showinfoecolagemodal = ({ closemodal, student, fresh, reload }: ShowInfoStudentsProps) => {
  const eleveNom = `${student.prenom} ${student.nom}`

  const [paymois, setPaymois] = useState()
  const [up, setUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('Complet')

  const [ecoleInfo, setEcoleInfo] = useState<EcoleInfo>({
    name: '',
    owner: '',
    telephone: '',
    email: '',
    adresse: '',
    decision: '',
    code: ''
  })

  const getSchool = async () => {
    try {
      await axiosRequest('GET', 'school', null, 'token')
        .then(({ data }) => {
          const result = Array.isArray(data) ? data[0] : data
          if (result) setEcoleInfo(result)
        })
        .catch((error) => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSchool()
  }, [])

  const pay = async (id: number, cost: number) => {
    try {
      await axiosRequest(
        'PUT',
        `ecolage-pay/${id}`,
        {
          cost: cost,
          eleve: eleveNom,
          classe: student.sousetudiants[student.sousetudiants.length - 1].classe.nom_classe,
          salle: student.sousetudiants[student.sousetudiants.length - 1]?.salle?.nom_salle,
          annee: student.sousetudiants[student.sousetudiants.length - 1].annee.annee,
          ac_id: student.sousetudiants[student.sousetudiants.length - 1].annee.id,
          prof: student.enfantProf,
          type: selectedType.toLowerCase()
        },
        'token'
      )
        .then(({ data }) => toast.success(data?.message))
        .then(() => fresh(!reload))
        .then(() => setUp(!up))
        .catch((error) => toast.error(error.response.data.message))
    } catch (error) {
      console.log('Le serveur ne repond pas')
    }
  }

  const getEcolage = async () => {
    setIsLoading(true)
    try {
      await axiosRequest(
        'GET',
        `pay-mois/${student.sousetudiants[student.sousetudiants.length - 1].id}`,
        null,
        'token'
      )
        .then(({ data }) => setPaymois(data))
        .catch((error) => console.log(error))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getEcolage()
  }, [up])

  const [selectedEcolage, setSelectedEcolage] = useState<any | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = (paiement: any) => {
    setSelectedEcolage(paiement)
    setTimeout(() => {
      if (!printRef.current) return
      const printContents = printRef.current.innerHTML
      if (!printContents) return
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }, 200)
  }

  const [ecolageConfirmation, setEcolageConfirmation] = useState<EcolageToConfirm | null>(null)
  const [isPayingLoader, setIsPayingLoader] = useState(false)
  const { openModal, modal, closModal } = useMultiModals()
  const [paymentTypeModal, setPaymentTypeModal] = useState<{ mois: string; cost: number } | null>(
    null
  )

  const handleRequestPayment = (id, mois, cost, payé = null, reste = null) => {
    setEcolageConfirmation({ id, mois, cost, payé, reste })
    setPaymentTypeModal({ mois, cost })
  }

  const handleConfirmPaymentType = (type: string, montant: number) => {
    setEcolageConfirmation((prev) => (prev ? { ...prev, type, cost: montant } : null))
    setPaymentTypeModal(null)
    openModal('confirmDelete')
  }

  const handleConfirmPayment = async () => {
    if (!ecolageConfirmation) return
    const { id, cost } = ecolageConfirmation
    setIsPayingLoader(true)
    try {
      await pay(id, cost)
    } finally {
      setIsPayingLoader(false)
      setEcolageConfirmation(null)
      closModal('confirmDelete')
    }
  }

  const [paymentHistoryModal, setPaymentHistoryModal] = useState<{
    mois: string
    history: any[]
  } | null>(null)

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
            <FaSchool className="text-[#895256]" />{' '}
            {student.sousetudiants[student.sousetudiants.length - 1]?.salle?.nom_salle} - Année{' '}
            {student.sousetudiants[student.sousetudiants.length - 1]?.annee.annee}
          </p>
          <h3 className="text-xl font-semibold text-[#895256] mt-2">Paiements d'écolage</h3>
        </div>

        <div
          className={`${isLoading ? 'flex items-center justify-center' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'}`}
        >
          {isLoading ? (
            <div className="flex w-full h-full items-center justify-center">
              <RotatingLines
                visible={true}
                strokeColor="#7A3B3F"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          ) : (
            <>
              {paymois?.ecolage.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between p-4 rounded-2xl bg-white border border-gray-200 shadow-md transition hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-700">{item?.mois}</h4>
                    {item?.payé === 1 ? (
                      <div className="flex group gap-5">
                        <div className="relative group">
                          <FaPrint
                            title="Imprimer le reçu"
                            className="text-gray-600 cursor-pointer hover:text-blue-500"
                            onClick={() =>
                              handlePrint({
                                eleve: eleveNom,
                                classe:
                                  student.sousetudiants[student.sousetudiants.length - 1].classe
                                    .nom_classe,
                                salle:
                                  student.sousetudiants[student.sousetudiants.length - 1]?.salle
                                    ?.nom_salle,
                                annee:
                                  student.sousetudiants[student.sousetudiants.length - 1].annee
                                    .annee,
                                mois: item?.mois,
                                montant:
                                  student.sousetudiants[student.sousetudiants.length - 1].classe
                                    .ecolage,
                                datePaiement: item?.updated_at,
                                numeroRecu: item.id
                              })
                            }
                          />
                        </div>
                        <FaInfoCircle
                          className="text-yellow-600 cursor-pointer hover:text-yellow-400"
                          title="Voir historique du paiement"
                          onClick={() =>
                            setPaymentHistoryModal({ mois: item.mois, history: item.history || [] })
                          }
                        />
                        <FaCheckCircle className="text-green-500 text-lg" />
                      </div>
                    ) : (
                      <div className="flex group gap-5">
                        <div className="relative group"></div>
                        <FaInfoCircle
                          className="text-yellow-600 cursor-pointer hover:text-yellow-400"
                          title="Voir historique du paiement"
                          onClick={() =>
                            setPaymentHistoryModal({ mois: item.mois, history: item.history || [] })
                          }
                        />
                        <FaTimesCircle className="text-red-500 text-lg" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                      <FaWallet className="text-[#895256]" />
                      <span>
                        {(
                          student.sousetudiants[student.sousetudiants.length - 1]?.classe?.ecolage /
                          (student.enfantProf == 1 ? 2 : 1)
                        ).toLocaleString()}{' '}
                        Ar
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <FaCalendarAlt className="text-[#895256]" />
                      <span>{item.payé == 1 ? formatDate(item.updated_at) : 'Non payé'}</span>
                    </div>
                  </div>

                  {item.payé ? (
                    <span
                      onClick={() =>
                        handleRequestPayment(
                          item.id,
                          item.mois,
                          student.sousetudiants[student.sousetudiants.length - 1]?.classe
                            ?.ecolage || 0,
                          item.payé,
                          item.reste
                        )
                      }
                      className={`mt-3 px-3 py-1 text-sm font-semibold rounded-full cursor-pointer text-white text-center ${
                        item.payé === 1
                          ? 'bg-green-600'
                          : 'bg-gray-400 hover:bg-gray-700 cursor-pointer'
                      }`}
                    >
                      {item.payé == 1 ? 'Payé' : 'Non Payé'}
                    </span>
                  ) : (
                    <span
                      onClick={() =>
                        handleRequestPayment(
                          item.id,
                          item.mois,
                          student.sousetudiants[student.sousetudiants.length - 1]?.classe
                            ?.ecolage || 0,
                          item.payé,
                          item.reste
                        )
                      }
                      className={`mt-3 px-3 py-1 text-sm font-semibold rounded-full text-white text-center ${
                        item.payé === 1
                          ? 'bg-green-600'
                          : 'bg-gray-400 hover:bg-gray-700 cursor-pointer'
                      }`}
                    >
                      {item.payé == 1 ? 'Payé' : 'Non Payé'}
                    </span>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {paymentTypeModal && (
        <PaymentTypeModalecolage
          student={student}
          reste={ecolageConfirmation?.reste}
          pay={ecolageConfirmation?.payé}
          id={ecolageConfirmation?.id}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          mois={paymentTypeModal.mois}
          montant={paymentTypeModal.cost}
          closemodal={() => setPaymentTypeModal(null)}
          onConfirm={handleConfirmPaymentType}
        />
      )}

      {modal.confirmDelete && ecolageConfirmation && (
        <ConfirmDeleteModal
          title="Confirmation de Paiement"
          message={`Voulez-vous confirmer le ${selectedType == 'Complet' ? 'payement' : ''} ${selectedType} d'écolage pour le mois de ${ecolageConfirmation.mois} d'un montant de ${ecolageConfirmation.cost?.toLocaleString()} Ar pour ${eleveNom} ?`}
          onConfirm={handleConfirmPayment}
          closemodal={() => closModal('confirmDelete')}
          isDeletingLoader={isPayingLoader}
        />
      )}

      {selectedEcolage && (
        <div className="hidden">
          <Recuepayementecolage
            ref={printRef}
            eleve={selectedEcolage.eleve}
            numeroRecu={selectedEcolage.numeroRecu}
            classe={selectedEcolage.classe}
            salle={selectedEcolage.salle}
            annee={selectedEcolage.annee}
            mois={selectedEcolage.mois}
            montant={selectedEcolage.montant}
            datePaiement={selectedEcolage.datePaiement}
            school={ecoleInfo.name}
            ecoleInfo={ecoleInfo}
          />
        </div>
      )}

      {paymentHistoryModal && (
        <PaymentHistoryModal
          eleve={eleveNom}
          numeroRecu={undefined}
          classe={student.sousetudiants[student.sousetudiants.length - 1].classe.nom_classe}
          salle={student.sousetudiants[student.sousetudiants.length - 1]?.salle?.nom_salle}
          annee={student.sousetudiants[student.sousetudiants.length - 1].annee.annee}
          mois={paymentHistoryModal.mois}
          history={paymentHistoryModal.history}
          fresh={fresh}
          reload={reload}
          school={ecoleInfo.name}
          ecoleInfo={ecoleInfo}
          closeModal={() => setPaymentHistoryModal(null)}
        />
      )}
    </div>
  )
}

export default Showinfoecolagemodal
