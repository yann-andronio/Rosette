import { Monthlistedata } from '@renderer/data/Monthlistedata'
import logo from '../../images/logo.jpg'
import { useEffect, useState } from 'react'
import { axiosRequest } from '@renderer/config/helpers'
import { formatDate } from '@renderer/utils/FormatDate'

type Salaire = {
  mois: number[]
  montant: number
  typePaiement: string
  motif?: string
}

type RecueProps = {
  employer: {
    nom: string
    prenom: string
    profs?: {profession:string}
    created_at?: string | Date
  }
  salaire: Salaire
}

export default function Recuepayementemploye({ employer, salaire }: RecueProps) {
  const [decision, setDecision] = useState<string>('')
  const getDecision = async () => {
    try{

      await axiosRequest('GET', 'nif',null, 'token')
        .then(({data}) => setDecision(data))
        .catch(error => console.log(error))
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getDecision()
  }, [])
  const formatNumber = (num?: number) => num ? num.toLocaleString('fr-FR', { minimumFractionDigits: 0 }) : '-'
  const moisLabel =salaire.mois
  const datePaiement = new Date().toLocaleDateString('fr-FR')

  return (
    <div
      id="recue-salaire-employer-a-imprimer"
      className="p-8 text-sm text-gray-800 w-full max-w-[800px] mx-auto border border-gray-200 rounded-xl bg-white"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <img src={logo} alt="Logo" className="w-24 h-auto" />
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">REÇU DE SALAIRE</h1>
          <p className="text-xs text-gray-600">Entreprise La Rosette II</p>
          <p className="text-xs text-gray-600">Adresse : Mananara</p>
          <p className="text-xs text-gray-600">NIF : {decision}</p>
        </div>
      </div>

      {/* Informations de l'employé */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2 text-gray-700">Informations de l'employé</h2>
        <p>
          <span className="font-semibold">Nom :</span>{' '}
          {employer.nom && employer.prenom ? `${employer.nom} ${employer.prenom}` : '-'}
        </p>
        <p>
          <span className="font-semibold">Fonction :</span> {employer?.profs.profession || '-'}
        </p>
        <p>
          <span className="font-semibold">Date d'embauche :</span> {formatDate(employer.created_at)}
        </p>
      </div>

      {/* Détails du paiement */}
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

      {/* Signature */}
      <div className="flex justify-between mt-8">
        <div className="text-center">
          <p className="font-semibold">Fait à Mananara Avaratra, le {datePaiement}</p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div className="text-center">
          <p className="font-semibold">Employeur</p>
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
