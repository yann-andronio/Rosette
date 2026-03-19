import { axiosRequest } from '@renderer/config/helpers'
import { Etudiant } from '@renderer/pages/students/studentsinfo/Studentsinfo'
import { formatDate } from '@renderer/utils/FormatDate'
import { useEffect, useRef, useState } from 'react'
import { FiX, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import { LuPrinter } from 'react-icons/lu'
import { toast } from 'react-toastify'
import PapierImpressionRecueKermess from './PapierImpressionRecueKermess'
import useMultiModals from '@renderer/hooks/useMultiModals'
import ConfirmDeleteModal from '@renderer/components/modalsform/ConfirmDeleteModal'

type ShowInfoDroitsProps = {
  closemodal: () => void
  student: Etudiant
  fresh: (boolean) => void
  reload: boolean
}

export default function ShowinfoKermessmodal({ closemodal, student }: ShowInfoDroitsProps) {
  const [loading, setLoading] = useState(false)
  const [loadingHisto, setLoadingHisto] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'paiement' | 'historique'>('paiement')
  const [montant, setMontant] = useState<number>()
  const [selectedType, setSelectedType] = useState<'Complet' | 'Avance' | 'Remboursé'>('Complet')
  const [histo, setHisto] = useState<
    { id: number; montant: number; type: string; reste: number; created_at: string }[]
  >([])
  const [fresh, setFresh] = useState(false)
  const [droitinfo, setDroitinfo] = useState<{ payed: number }>({
    payed: student.sousetudiants[student.sousetudiants.length - 1]?.studentkr?.payed
  })

  const getDroitInfo = async () => {
    await axiosRequest(
      'GET',
      `krinfo/${student.sousetudiants[student.sousetudiants.length - 1]?.studentkr?.id}`,
      null,
      'token'
    ).then(({ data }) => setDroitinfo(data))
  }

  useEffect(() => {
    getDroitInfo()
  }, [fresh])

  const getHisto = async () => {
    setLoadingHisto(true)
    await axiosRequest(
      'GET',
      `krhisto/${student.sousetudiants[student.sousetudiants.length - 1]?.studentkr?.id}`,
      null,
      'token'
    ).then(({ data }) => setHisto(data))
    setLoadingHisto(false)
  }

  const deletehisto = async () => {
    if (!selectedDeleteId) return
    setIsDeletingLoader(true)
    await axiosRequest('DELETE', `krhisto/${selectedDeleteId}`, null, 'token')
      .then(({ data }) => toast.success(data.message))
      .then(() => setFresh((fresh) => !fresh))
      .finally(() => {
        setIsDeletingLoader(false)
        closModal('deleteHisto')
        setSelectedDeleteId(null)
      })
  }
  useEffect(() => {
    if (activeTab === 'historique') {
      getHisto()
    }
  }, [activeTab, fresh])

  const pay = async () => {
    setLoading(true)
    try {
      await axiosRequest(
        'POST',
        'etudiant-kermesse',
        {
          type: selectedType.toLowerCase(),
          montant: selectedType != 'Avance' ? 0 : montant,
          se_id: student.sousetudiants[student.sousetudiants.length - 1].id,
          ac_id: student.sousetudiants[student.sousetudiants.length - 1].ac_id
        },
        'token'
      )
        .then(({ data }) => toast.success(data.message))
        .then(() => setFresh(!fresh))
        .catch((err) => toast.error(err.response.data.message))
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const payed = droitinfo.payed
  const printRef = useRef<HTMLDivElement>(null)
  const { modal, openModal, closModal } = useMultiModals()
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null)
  const [isDeletingLoader, setIsDeletingLoader] = useState(false)

  const handlePrintStudentRecue = () => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#212529]">Paiement de Kermess / Historique</h1>
          <button onClick={closemodal} className="text-gray-400 hover:text-red-600 transition">
            <FiX size={24} />
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <h2 className="font-bold text-lg text-[#212529] mb-1">
            {student.nom} {student.prenom}
          </h2>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">
                {student?.sousetudiants.length > 1 ? 'Ancien(ne)' : 'Nouveau(lle)'}
              </span>
            </p>
            <p>
              <span className="font-semibold">
                Total à payer:{' '}
                {student?.sousetudiants.length > 1
                  ? student?.sousetudiants[student.sousetudiants.length - 1].classe?.droit_ancien
                  : student?.sousetudiants[student.sousetudiants.length - 1].classe?.droit}{' '}
                Ar
              </span>
            </p>
            <p>
              <span className="font-semibold">Classe :</span>
              {student?.sousetudiants[student.sousetudiants.length - 1].classe.nom_classe}
            </p>
            <p>
              <span className="font-semibold">Matricule :</span> {student.matricule || '—'}
            </p>
            <p>
              <span className="font-semibold">Statut :</span>{' '}
              <span className="text-[#895256] font-bold">
                {droitinfo.payed == 1 ? 'Payé' : 'Non payé'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {['paiement', 'historique'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'paiement' | 'historique')}
              className={`pb-2 text-lg font-semibold transition ${
                activeTab === tab
                  ? 'border-b-4 border-[#895256] text-[#895256]'
                  : 'text-gray-400 hover:text-[#895256]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'paiement' ? (
          <div className="space-y-5">
            {/* Montant */}
            <div>
              <label className="block text-[#212529] font-semibold mb-2">
                Montant du Kermess (Ar)
              </label>
              <input
                type="number"
                disabled={payed && selectedType != 'Remboursé'}
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                placeholder="Ex: 150000"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#895256] text-[#212529] font-medium placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-[#212529] font-semibold mb-2">Type de paiement</label>
              <div className="flex gap-3">
                {['Complet', 'Avance', 'Remboursé'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type as any)}
                    className={`px-4 py-2 rounded-xl border-2 font-medium transition-all ${
                      selectedType === type
                        ? 'border-[#895256] bg-[#895256] text-white shadow-md'
                        : 'border-gray-300 bg-gray-50 text-[#212529] hover:border-[#895256] hover:bg-[#fff4e6]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading || (payed && selectedType != 'Remboursé')}
              onClick={pay}
              className={`w-full mt-4 py-3 ${payed && selectedType != 'Remboursé' ? 'cursor-not-allowed bg-gray-500' : 'bg-[#895256] hover:bg-[#733935]'}
               text-white font-semibold rounded-xl transition-all shadow-md flex justify-center items-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Paiement...
                </>
              ) : (
                <>
                  <FiPlus size={18} />
                  Valider le paiement
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {loadingHisto ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-8 h-8 border-4 border-[#895256] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : histo.length === 0 ? (
              <p className="text-center text-gray-500">Aucun paiement enregistré</p>
            ) : (
              <ul className="space-y-3">
                {histo.map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-semibold text-[#212529]">
                        Montant : {item.montant.toLocaleString()} Ar
                      </p>
                      <p className="text-sm text-gray-500">Date : {formatDate(item.created_at)}</p>
                      <p className="text-sm">
                        Type : <span className="font-medium text-[#895256]">{item.type}</span>
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          item.reste === 0 ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {'Reste:' + item.reste + ' Ar'}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          item.reste === 0 ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {item.reste == 0 ? 'Payé' : 'Non Payé'}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {/* <button className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition">
                        <FiEdit size={18} />
                      </button> */}
                      <button
                        onClick={() => {
                          setSelectedPayment(item)
                          handlePrintStudentRecue()
                        }}
                        title="Imprimer le reçu"
                        className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                      >
                        <LuPrinter size={20} />
                      </button>
                      <button
                        title="Supprimer l'historique"
                        onClick={() => {
                          setSelectedDeleteId(item.id)
                          openModal('deleteHisto')
                        }}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {modal.deleteHisto && (
        <ConfirmDeleteModal
          closemodal={() => closModal('deleteHisto')}
          onConfirm={deletehisto}
          isDeletingLoader={isDeletingLoader}
          title="Confirmation de suppression"
          message="Voulez-vous vraiment supprimer cet historique de paiement ?"
        />
      )}

      <div className="hidden">
        <PapierImpressionRecueKermess
          student={student}
          paymentInfo={selectedPayment}
          ref={printRef}
        />
      </div>
    </div>
  )
}
