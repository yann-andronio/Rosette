import logo from '../../images/logo.jpg'
import { formatDate } from '@renderer/utils/FormatDate'

type EcoleInfo = {
  name: string
  owner: string
  telephone: string
  email: string
  adresse: string
  decision: string
  code: string
}

type Salaire = {
  mois: number[]
  montant: number
  type: number
  motif?: string
}

type RecueProps = {
  employer: {
    nom: string
    prenom: string
    profs?: { profession: string }
    created_at?: string | Date
  }
  salaire: Salaire
  nif: string
  ecoleInfo: EcoleInfo
}

export default function Recuepayementemploye({ employer, salaire, nif, ecoleInfo }: RecueProps) {
  const formatNumber = (num?: number) =>
    num ? num.toLocaleString('fr-FR', { minimumFractionDigits: 0 }) : '-'

  const moisLabel = salaire.mois
  const datePaiement = new Date().toLocaleDateString('fr-FR')

  return (
    <div
      id="recue-salaire-employer-a-imprimer"
      className="p-8 text-sm text-gray-800 w-full max-w-[800px] mx-auto border border-gray-200 rounded-xl bg-white"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <img src={logo} alt="Logo" className="w-24 h-auto" />
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">REÇU DE SALAIRE</h1>
          <p className="text-xs text-gray-600 font-semibold uppercase">{ecoleInfo.name}</p>
          {ecoleInfo.adresse && (
            <p className="text-xs text-gray-600">Adresse : {ecoleInfo.adresse}</p>
          )}
          {ecoleInfo.telephone && (
            <p className="text-xs text-gray-600">Tél : {ecoleInfo.telephone}</p>
          )}
          {ecoleInfo.email && <p className="text-xs text-gray-600">Email : {ecoleInfo.email}</p>}
          {ecoleInfo.decision && (
            <p className="text-xs text-gray-600">Décision : {ecoleInfo.decision}</p>
          )}
          {ecoleInfo.code && <p className="text-xs text-gray-600">Code : {ecoleInfo.code}</p>}
          <p className="text-xs text-gray-600">NIF : {nif}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2 text-gray-700">Informations de l'employé</h2>
        <p>
          <span className="font-semibold">Nom :</span>{' '}
          {employer.nom && employer.prenom ? `${employer.nom} ${employer.prenom}` : '-'}
        </p>
        <p>
          <span className="font-semibold">Fonction :</span> {employer?.profs?.profession || '-'}
        </p>
        <p>
          <span className="font-semibold">Date d'embauche :</span> {formatDate(employer.created_at)}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2 text-gray-700">Détails du paiement</h2>
        <table className="w-full text-sm border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Mois</th>
              <th className="border px-2 py-1">Montant (Ar)</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Motif</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">{moisLabel}</td>
              <td className="border px-2 py-1">{formatNumber(salaire.montant)}</td>
              <td className="border px-2 py-1">
                {salaire.type == 1
                  ? 'Salaire Complet'
                  : salaire.type == 0
                    ? 'Avance sur Salaire'
                    : 'Reste sur Salaire'}
              </td>
              <td className="border px-2 py-1">{salaire.motif || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Lieu et date ── */}
      <div className="flex justify-between mt-8">
        <div className="text-center">
          <p className="font-semibold">
            Fait à {ecoleInfo.adresse?.split(',')[0] || 'Mananara'}, le {datePaiement}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div className="text-center">
          <p className="font-semibold">Employeur</p>
          {ecoleInfo.owner && <p className="text-xs text-gray-600 mt-1">{ecoleInfo.owner}</p>}
          <div className="w-32 h-16 border-b border-gray-400 mx-auto mt-2"></div>
        </div>
        <div className="text-center">
          <p className="font-semibold">Employé</p>
          <div className="w-32 h-16 border-b border-gray-400 mx-auto mt-2"></div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Ce reçu sert de preuve du paiement effectué au salarié.
      </p>
    </div>
  )
}
