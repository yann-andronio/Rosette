import { forwardRef } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import logo from '../../../images/logo.jpg'

type EcoleInfo = {
  name: string
  owner: string
  telephone: string
  email: string
  adresse: string
  decision: string
  code: string
}

type PrintHistoryEcolageProps = {
  mois: string
  school: string
  ecoleInfo: EcoleInfo
  paiement: {
    id: number
    montant: number
    created_at: string
    type: string
    reste: number
    eleve: string
    classe: string
    salle: string
    annee: string
  }
}

const PrintHistoryEcolage = forwardRef<HTMLDivElement, PrintHistoryEcolageProps>(
  ({ mois, paiement, school, ecoleInfo }, ref) => {
    const formattedDatePaiement = new Date(paiement.created_at).toLocaleDateString('fr-FR')
    const statut = paiement.reste === 0 ? 'Payé' : 'Non Payé'
    const statutColor = paiement.reste === 0 ? 'text-green-700' : 'text-red-700'
    const typeLabel = paiement.type?.toUpperCase()
    const montant = paiement.montant

    return (
      <div
        ref={ref}
        className="bg-white w-[600px] mx-auto p-8 border border-gray-900 shadow-xl text-sm leading-normal text-gray-900 print:w-full print:shadow-none print:p-4"
      >
  
        <div className="flex justify-between items-start border-b-2 border-[#895256] pb-4 mb-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo de l'école" className="w-20 h-20 object-contain" />
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 uppercase tracking-wider">
                {ecoleInfo.name || school}
              </h1>
              <p className="text-xs text-gray-700 font-medium mt-1">
                Lycée Privé - Homologué par le Ministère
              </p>
              {ecoleInfo.decision && (
                <p className="text-xs text-gray-500 mt-0.5">Décision : {ecoleInfo.decision}</p>
              )}
              {ecoleInfo.code && (
                <p className="text-xs text-gray-500 mt-0.5">Code : {ecoleInfo.code}</p>
              )}
            </div>
          </div>

          <div className="text-xs text-right space-y-1 pt-1 text-gray-800">
            <div className="flex items-center justify-end gap-1">
              <FaMapMarkerAlt size={10} className="text-gray-600" />
              <span>{ecoleInfo.adresse || 'Mananara 511, Madagascar'}</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <FaPhone size={10} className="text-gray-600" />
              <span>{ecoleInfo.telephone || '+261 324334407'}</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <FaEnvelope size={10} className="text-gray-600" />
              <span>{ecoleInfo.email || 'contact@ecole.mg'}</span>
            </div>
          </div>
        </div>


        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 uppercase border-b-2 border-gray-400 pb-1 inline-block">
            REÇU DE PAIEMENT D'ÉCOLAGE
          </h2>
          <div className="mt-3 flex flex-col gap-1 items-center">
            <p className="text-sm font-semibold text-gray-800">
              N° Reçu :{' '}
              <span className="text-lg font-extrabold text-[#895256]">ECO-{paiement.id}</span>
            </p>
            <p className={`text-sm font-bold ${statutColor}`}>Statut : {statut}</p>
            {/* <p className="text-sm text-gray-700">
              Type : <span className="font-semibold text-[#895256]">{typeLabel}</span>
            </p> */}
          </div>
        </div>

      
        <div className="mb-6 p-4 border border-gray-400 rounded-lg bg-gray-50">
          <h3 className="text-base font-bold mb-3 border-b border-gray-300 pb-1 text-gray-700">
            INFORMATIONS DE L'ÉLÈVE
          </h3>
          <div className="grid grid-cols-2 gap-y-2">
            <p>
              <span className="font-bold">Nom et Prénom :</span>{' '}
              <span className="font-semibold">{paiement.eleve}</span>
            </p>
            <p>
              <span className="font-bold">Année scolaire :</span>{' '}
              <span className="font-semibold">{paiement.annee}</span>
            </p>
            <p>
              <span className="font-bold">Classe :</span>{' '}
              <span className="font-semibold">
                {paiement.classe} ({paiement.salle})
              </span>
            </p>
            <p>
              <span className="font-bold">Mois payé :</span>{' '}
              <span className="font-semibold uppercase">{mois}</span>
            </p>
          </div>
        </div>

     
        <h3 className="text-base font-bold mb-3 text-gray-700">DÉTAILS DU PAIEMENT</h3>
        <div className="border-2 border-gray-600 rounded-lg mb-6 overflow-hidden">
          <div className="mb-4 flex justify-end">
            <span className={`px-3 py-1 text-xs font-bold ${statutColor}`}>{statut}</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[#895256] text-white">
              <tr>
                <th className="text-left p-3 font-semibold w-1/2">Libellé</th>
                <th className="text-center p-3 font-semibold w-1/4">Date de paiement</th>
                <th className="text-right p-3 font-semibold w-1/4">Montant Payé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">
                  Écolage du mois de {mois} ({typeLabel=='rembourse'.toUpperCase()?'Remboursement'.toUpperCase():typeLabel})
                </td>
                <td className="p-3 text-center">{formattedDatePaiement}</td>
                <td className="p-3 text-right font-bold text-lg">{montant.toLocaleString()} Ar</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-3 font-medium">Reste à payer</td>
                <td></td>
                <td className={`p-3 text-right font-bold ${statutColor}`}>
                  {paiement.reste.toLocaleString()} Ar
                </td>
              </tr>
              <tr className="border-t border-gray-400 bg-gray-100">
                <td colSpan={2} className="p-3 text-right text-base font-extrabold text-gray-900">
                  MONTANT TOTAL REÇU :
                </td>
                <td className="p-3 text-right text-xl font-extrabold text-gray-900 border-l border-gray-400">
                  {montant.toLocaleString()} Ar
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Lieu et date ── */}
        <p className="text-sm mb-10 text-right">
          Fait à{' '}
          <span className="font-semibold">{ecoleInfo.adresse?.split(',')[0] || 'Mananara'}</span>,
          le <span className="font-semibold">{formattedDatePaiement}</span>.
        </p>

    
        <div className="flex justify-between mt-10 text-sm">
          <div className="text-center w-1/3">
            <p className="mb-12 border-b border-dashed border-gray-500 pb-1">
              Signature de l'élève / parent
            </p>
          </div>
          <div className="text-center w-1/3">
            <p className="mb-12 border-b border-dashed border-gray-500 pb-1">
              Signature & Cachet de l'École
            </p>
            {ecoleInfo.owner && <p className="text-xs text-gray-600 mt-1">{ecoleInfo.owner}</p>}
          </div>
        </div>

      
        <div className="mt-12 text-center text-xs text-gray-600 border-t pt-3">
          <p className="font-bold text-gray-800">CONSERVEZ PRÉCIEUSEMENT CE DOCUMENT.</p>
          <p className="mt-1">
            Ce reçu est généré automatiquement par le système de gestion de l'établissement et fait
            foi de paiement.
          </p>
        </div>
      </div>
    )
  }
)

export default PrintHistoryEcolage
